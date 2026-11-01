import { connectToDatabase } from "./mongodb";
import { Message, IMessage } from "@/models/Message";
import fs from "fs/promises";
import path from "path";

const LOCAL_STORAGE_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORAGE_FILE = path.join(LOCAL_STORAGE_DIR, "messages.json");

interface MessageInput {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  contactPreference?: "call" | "whatsapp" | "email";
}

async function ensureLocalFile() {
  try {
    await fs.mkdir(LOCAL_STORAGE_DIR, { recursive: true });
    try {
      await fs.access(LOCAL_STORAGE_FILE);
    } catch {
      await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Local storage initialization error:", err);
  }
}

export async function createMessage(input: MessageInput) {
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

  // Fallback to local storage when MongoDB URI is not yet configured
  await ensureLocalFile();
  const fileData = await fs.readFile(LOCAL_STORAGE_FILE, "utf-8");
  const messages = JSON.parse(fileData || "[]");

  const newMessage = {
    _id: "local_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject || "Portfolio Connection Request",
    message: input.message,
    contactPreference: input.contactPreference || "call",
    status: "unread",
    createdAt: new Date().toISOString(),
    source: "local-storage",
  };

  messages.unshift(newMessage);
  await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(messages, null, 2), "utf-8");
  return newMessage;
}

export async function getAllMessages() {
  const db = await connectToDatabase();
  if (db) {
    const docs = await Message.find().sort({ createdAt: -1 }).lean();
    return docs.map((doc: any) => ({
      ...doc,
      _id: doc._id.toString(),
      source: "mongodb",
    }));
  }

  // Fallback
  await ensureLocalFile();
  const fileData = await fs.readFile(LOCAL_STORAGE_FILE, "utf-8");
  const messages = JSON.parse(fileData || "[]");
  return messages;
}

export async function updateMessageStatus(id: string, status: "unread" | "read" | "replied") {
  const db = await connectToDatabase();
  if (db && !id.startsWith("local_")) {
    const updated = await Message.findByIdAndUpdate(id, { status }, { new: true });
    return updated;
  }

  // Fallback
  await ensureLocalFile();
  const fileData = await fs.readFile(LOCAL_STORAGE_FILE, "utf-8");
  const messages = JSON.parse(fileData || "[]");
  const index = messages.findIndex((m: any) => m._id === id);
  if (index !== -1) {
    messages[index].status = status;
    await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(messages, null, 2), "utf-8");
    return messages[index];
  }
  return null;
}

export async function deleteMessage(id: string) {
  const db = await connectToDatabase();
  if (db && !id.startsWith("local_")) {
    await Message.findByIdAndDelete(id);
    return true;
  }

  // Fallback
  await ensureLocalFile();
  const fileData = await fs.readFile(LOCAL_STORAGE_FILE, "utf-8");
  const messages = JSON.parse(fileData || "[]");
  const filtered = messages.filter((m: any) => m._id !== id);
  await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

