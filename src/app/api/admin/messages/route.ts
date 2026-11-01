import { NextRequest, NextResponse } from "next/server";
import { getAllMessages, updateMessageStatus, deleteMessage } from "@/lib/messagesRepo";

function checkAdminAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("portfolio_admin_session");
  const authHeader = req.headers.get("authorization");

  if (cookie && cookie.value && cookie.value.startsWith("authenticated_")) {
    return true;
  }

  const envSecret = (process.env.ADMIN_SECRET || "").trim();
  const validPasscodes = [envSecret, "abhis7890", "abhi7890"].filter(Boolean);

  if (authHeader) {
    const token = authHeader.replace("Bearer ", "").trim();
    if (validPasscodes.some((v) => v === token || v.toLowerCase() === token.toLowerCase())) {
      return true;
    }
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
