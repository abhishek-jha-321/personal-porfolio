import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const correctPasscode = process.env.ADMIN_SECRET || "admin123";

    if (!passcode || passcode !== correctPasscode) {
      return NextResponse.json(
        { success: false, error: "Invalid admin passcode." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    // Set cookie for 7 days
    response.cookies.set({
      name: "portfolio_admin_session",
      value: "authenticated_" + Buffer.from(correctPasscode).toString("base64"),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
  response.cookies.set({
    name: "portfolio_admin_session",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}

