import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const entered = (passcode || "").trim();

    const envSecret = (process.env.ADMIN_SECRET || "").trim();
    // Valid passcodes: custom env var, user's chosen passcode 'abhi7890', or default 'admin123'
    const validPasscodes = [envSecret, "abhi7890", "admin123"].filter(Boolean);

    const isMatch = validPasscodes.some(
      (valid) => valid === entered || valid.toLowerCase() === entered.toLowerCase()
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin passcode. (Default: admin123 or abhi7890)",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    // Set secure cookie for 30 days
    response.cookies.set({
      name: "portfolio_admin_session",
      value: "authenticated_admin",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
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
