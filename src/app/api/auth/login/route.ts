import { NextResponse } from "next/server";
import { dataStore } from "@/lib/data-store";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check existing or default demo login
    let user = dataStore.getUserByEmail(email);

    if (!user) {
      // In demo mode, if founder enters their own credentials, auto-create their user profile
      user = dataStore.createUser({
        id: `usr_${Date.now()}`,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
        email,
        role: "Founder",
        location: "India",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    const organizations = dataStore.getOrganizations();
    const primaryOrg = organizations[0];

    const response = NextResponse.json({
      success: true,
      user,
      organization: primaryOrg,
    });

    // Set auth cookie
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
