import { NextResponse } from "next/server";
import { processAIChat, executeAIAction } from "@/lib/ai-engine";
import { dataStore } from "@/lib/data-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, orgId, userId, message, conversationId, proposalId, history } = body;

    const targetOrgId = orgId || "org_pulseai";
    const targetUserId = userId || "usr_founder_1";

    if (action === "execute_action") {
      if (!proposalId) {
        return NextResponse.json({ error: "proposalId is required" }, { status: 400 });
      }
      const result = executeAIAction(proposalId, targetOrgId);
      return NextResponse.json({ success: true, data: result });
    }

    // Default: chat message
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const convoId = conversationId || `convo_${Date.now()}`;
    const startTime = Date.now();

    const aiRes = await processAIChat(targetOrgId, targetUserId, message, convoId, history);
    const latency = Date.now() - startTime;

    // Track AI audit log
    dataStore.logAction({
      id: `log_${Date.now()}`,
      orgId: targetOrgId,
      userId: targetUserId,
      action: "AI_QUERY_COMPLETED",
      entity: "AIConversation",
      details: `Processed prompt "${message.slice(0, 40)}..." in ${latency}ms via Groq`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      data: {
        conversationId: convoId,
        content: aiRes.content,
        actionProposals: aiRes.actionProposals || [],
        metricsContext: aiRes.metricsContext,
        latencyMs: latency,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
