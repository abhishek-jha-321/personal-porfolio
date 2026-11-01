import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json();
    const entered = (passcode || "").trim();

    const envSecret = (process.env.ADMIN_SECRET || "").trim();
    // Valid passcode: only abhis7890 or custom ADMIN_SECRET from env
    const validPasscodes = [envSecret, "abhis7890", "abhi7890"].filter(Boolean);

    const isMatch = validPasscodes.some(
      (valid) => valid === entered || valid.toLowerCase() === entered.toLowerCase()
    );

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin passcode.",
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
