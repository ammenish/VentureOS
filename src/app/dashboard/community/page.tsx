"use client";

import { useState, useEffect } from "react";
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Plus,
  Share2,
  Bookmark,
  Sparkles,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Post, Comment } from "@/lib/types";

const TOPICS = ["All Topics", "Growth & Sales", "Legal & Grants", "Tech & Architecture", "Fundraising"];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Post Form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("Growth & Sales");

  // Comments state
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>("post_1");
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  const loadPosts = async () => {
    try {
      const res = await fetch("/api/v1/community");
      const json = await res.json();
      if (json.success) {
        setPosts(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async (postId: string) => {
    try {
      const res = await fetch(`/api/v1/community?postId=${postId}`);
      const json = await res.json();
      if (json.success) {
        setComments(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPosts();
    loadComments("post_1");
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await fetch("/api/v1/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, topic }),
      });
      const json = await res.json();
      if (json.success) {
        setPosts((prev) => [json.data, ...prev]);
        setShowAddModal(false);
        setTitle("");
        setContent("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/v1/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_comment",
          postId,
          content: newComment,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setComments((prev) => [...prev, json.data]);
        setNewComment("");
        // bump comment count
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, commentCount: (p.commentCount || 0) + 1 } : p
          )
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredPosts = posts.filter((p) => {
    if (selectedTopic === "All Topics") return true;
    return p.topic === selectedTopic;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Founder Network & Peer Discussions
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Exchange operational playbooks, regulatory insights, and pilot strategies with fellow founders.
          </p>
        </div>

        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-[#111110] hover:bg-[#27272A] text-white text-xs shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Share Learning / Ask Q
        </Button>
      </div>

      {/* Topic Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTopic === t
                ? "bg-[#111110] text-white shadow-xs"
                : "bg-white/80 border border-[#E5E5E0] text-neutral-600 hover:bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Posts Feed & Discussion Threads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Posts */}
        <div className="lg:col-span-2 space-y-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="border-[#E5E5E0] shadow-xs hover:border-neutral-300 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="outline" className="text-[10px] text-[#111110] border-[#E5E5E0] bg-[#111110]/[0.05]">
                    {post.topic || "Discussion"}
                  </Badge>
                  <span className="text-[11px] text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setPosts((prev) =>
                          prev.map((p) =>
                            p.id === post.id
                              ? { ...p, reactionCount: (p.reactionCount || 0) + 1 }
                              : p
                          )
                        );
                      }}
                      className="flex items-center gap-1.5 text-neutral-500 hover:text-[#111110] transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{post.reactionCount || 0} Upvotes</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveCommentsPostId(post.id);
                        loadComments(post.id);
                      }}
                      className="flex items-center gap-1.5 text-[#111110] font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentCount || 0} Comments</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    By {post.author?.name || "Verified Founder"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Right Col: Active Comment Thread Panel */}
        <div>
          <Card className="border-slate-200 shadow-xs sticky top-20">
            <CardHeader className="pb-3 border-b border-neutral-100">
              <CardTitle className="text-sm font-bold text-[#111110] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#111110]" />
                Discussion Thread
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-slate-700">
                        {c.author?.name || "Peer Founder"}
                      </span>
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{c.content}</p>
                  </div>
                ))}

                {comments.length === 0 && (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    No replies yet. Start the conversation!
                  </div>
                )}
              </div>

              {/* Add Comment Input */}
              {activeCommentsPostId && (
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a reply..."
                    className="text-xs h-9 flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCreateComment(activeCommentsPostId);
                      }
                    }}
                  />
                  <Button
                    onClick={() => handleCreateComment(activeCommentsPostId)}
                    size="sm"
                    className="h-9 px-3 bg-[#111110] hover:bg-[#27272A] text-white"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <h2 className="text-lg font-bold text-slate-900">Post to Founder Network</h2>
            <p className="text-xs text-slate-500 mt-1">
              Share real tactical lessons or request peer founder advice.
            </p>

            <form onSubmit={handleCreatePost} className="mt-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Topic Category
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                >
                  <option value="Growth & Sales">Growth & Sales</option>
                  <option value="Legal & Grants">Legal & Grants (DPIIT/SISFS)</option>
                  <option value="Tech & Architecture">Tech & Architecture</option>
                  <option value="Fundraising">Fundraising & Angels</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Discussion Title
                </label>
                <Input
                  required
                  placeholder="e.g. Navigating Indian CDSCO medical device exemptions in 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Post Content / Context
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your concrete experience, lessons learned, or exact dilemma..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#E5E5E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111110]/15"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-[#111110] hover:bg-[#27272A] text-white">
                  Publish Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
