import { connectToDatabase } from "./mongodb";
import { Message } from "@/models/Message";
import fs from "fs/promises";
import path from "path";
import os from "os";

// Detect serverless environment (Vercel, AWS Lambda, etc.)
const isServerless = Boolean(
  process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT
);

// On Vercel, process.cwd() is read-only, so we use os.tmpdir() (/tmp)
const STORAGE_DIR = isServerless ? os.tmpdir() : path.join(process.cwd(), ".data");
const STORAGE_FILE = path.join(STORAGE_DIR, "portfolio_messages.json");

// In-memory persistent array fallback across function invocations
declare global {
  // eslint-disable-next-line no-var
  var memoryMessagesCache: any[] | undefined;
}

if (!global.memoryMessagesCache) {
  global.memoryMessagesCache = [];
}

interface MessageInput {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  contactPreference?: "call" | "whatsapp" | "email";
}

async function ensureDirectory() {
  try {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

async function readLocalMessages(): Promise<any[]> {
  try {
    await ensureDirectory();
    const data = await fs.readFile(STORAGE_FILE, "utf-8");
    const parsed = JSON.parse(data || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // If file doesn't exist (ENOENT) or read fails, use in-memory cache
    return global.memoryMessagesCache || [];
  }
}

async function writeLocalMessages(messages: any[]): Promise<void> {
  // Update in-memory cache
  global.memoryMessagesCache = messages;
  try {
    await ensureDirectory();
    await fs.writeFile(STORAGE_FILE, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.warn("Storage write notice (using memory fallback):", err);
  }
}

export async function createMessage(input: MessageInput) {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await Message.create(input);
      return {
        _id: doc._id.toString(),
        name: doc.name,
        email: doc.email,
        phone: doc.phone,
        subject: doc.subject,
        message: doc.message,
        contactPreference: doc.contactPreference,
        status: doc.status,
        createdAt: doc.createdAt,
        source: "mongodb",
      };
    }
  } catch (dbErr: any) {
    console.error("MongoDB create failed, using local/memory fallback:", dbErr.message);
  }

  // Fallback to local / serverless /tmp storage
  const messages = await readLocalMessages();

  const newMessage = {
    _id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject || "Portfolio Connection Request",
    message: input.message,
    contactPreference: input.contactPreference || "call",
    status: "unread",
    createdAt: new Date().toISOString(),
    source: isServerless ? "vercel-storage" : "local-storage",
  };

  messages.unshift(newMessage);
  await writeLocalMessages(messages);
  return newMessage;
}

export async function getAllMessages() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const docs = await Message.find().sort({ createdAt: -1 }).lean();
      return docs.map((doc: any) => ({
        ...doc,
        _id: doc._id.toString(),
        source: "mongodb",
      }));
    }
  } catch (dbErr: any) {
    console.error("MongoDB find failed, reading fallback storage:", dbErr.message);
  }

  // Fallback
  return await readLocalMessages();
}

export async function updateMessageStatus(id: string, status: "unread" | "read" | "replied") {
  try {
    const db = await connectToDatabase();
    if (db && !id.startsWith("lead_")) {
      const updated = await Message.findByIdAndUpdate(id, { status }, { new: true });
      return updated;
    }
  } catch (dbErr: any) {
    console.error("MongoDB update failed:", dbErr.message);
  }

  // Fallback
  const messages = await readLocalMessages();
  const index = messages.findIndex((m: any) => m._id === id);
  if (index !== -1) {
    messages[index].status = status;
    await writeLocalMessages(messages);
    return messages[index];
  }
  return null;
}

export async function deleteMessage(id: string) {
  try {
    const db = await connectToDatabase();
    if (db && !id.startsWith("lead_")) {
      await Message.findByIdAndDelete(id);
      return true;
    }
  } catch (dbErr: any) {
    console.error("MongoDB delete failed:", dbErr.message);
  }

  // Fallback
  const messages = await readLocalMessages();
  const filtered = messages.filter((m: any) => m._id !== id);
  await writeLocalMessages(filtered);
  return true;
}
