import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const existing = dataStore.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const user = dataStore.createUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      role: "Founder",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const response = NextResponse.json({
      success: true,
      user,
    });

    response.cookies.set("ventureos_session", user.id, {
      httpOnly: true,
      path: "/",
      maxAge: 86400 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
