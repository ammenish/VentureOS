import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (postId) {
    const comments = dataStore.getComments(postId);
    return NextResponse.json({ success: true, data: comments });
  }

  const posts = dataStore.getPosts();
  return NextResponse.json({ success: true, data: posts });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, title, content, topic, postId } = body;

    if (action === "create_comment") {
      if (!postId || !content) {
        return NextResponse.json({ error: "postId and content are required" }, { status: 400 });
      }
      const newComment = dataStore.createComment({
        id: `cmt_${Date.now()}`,
        postId,
        authorId: "usr_founder_1",
        content,
        createdAt: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, data: newComment });
    }

    // Default: create post
    if (!title || !content) {
      return NextResponse.json({ error: "title and content are required" }, { status: 400 });
    }

    const newPost = dataStore.createPost({
      id: `post_${Date.now()}`,
      authorId: "usr_founder_1",
      title,
      content,
      topic: topic || "General",
      commentCount: 0,
      reactionCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, data: newPost });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
