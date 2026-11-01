import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/lib/messagesRepo";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message, contactPreference } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid mobile or WhatsApp number." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your message or reason to connect." },
        { status: 400 }
      );
    }

    const saved = await createMessage({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      subject: subject ? subject.trim() : "Portfolio Connection Request",
      message: message.trim(),
      contactPreference: ["call", "whatsapp", "email"].includes(contactPreference)
        ? contactPreference
        : "call",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully! Abhishek will connect with you soon.",
        data: saved,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong while sending your message. Please try again.",
      },
      { status: 500 }
    );
  }
}

