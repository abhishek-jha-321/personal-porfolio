import { NextRequest, NextResponse } from "next/server";
import { getAllMessages, updateMessageStatus, deleteMessage } from "@/lib/messagesRepo";

function checkAdminAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("portfolio_admin_session");
  const authHeader = req.headers.get("authorization");
  const correctPasscode = process.env.ADMIN_SECRET || "admin123";
  const expectedCookieVal = "authenticated_" + Buffer.from(correctPasscode).toString("base64");

  if (cookie && cookie.value === expectedCookieVal) {
    return true;
  }

  if (authHeader && authHeader === `Bearer ${correctPasscode}`) {
    return true;
  }

  return false;
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access to admin dashboard." },
      { status: 401 }
    );
  }

  try {
    const messages = await getAllMessages();

    // Compute stats
    const total = messages.length;
    const unread = messages.filter((m: any) => m.status === "unread").length;
    const totalPhoneNumbers = messages.filter((m: any) => Boolean(m.phone)).length;

    return NextResponse.json({
      success: true,
      stats: {
        total,
        unread,
        totalPhoneNumbers,
      },
      messages,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch messages." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { id, status } = await req.json();
    if (!id || !["unread", "read", "replied"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID or status value." },
        { status: 400 }
      );
    }

    const updated = await updateMessageStatus(id, status);
    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update message." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required." },
        { status: 400 }
      );
    }

    await deleteMessage(id);
    return NextResponse.json({ success: true, message: "Message deleted successfully." });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete message." },
      { status: 500 }
    );
  }
}

