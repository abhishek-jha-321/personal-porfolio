import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  contactPreference?: "call" | "whatsapp" | "email";
  status: "unread" | "read" | "replied";
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone/Mobile number is required"],
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    subject: {
      type: String,
      default: "Portfolio Connection Request",
      trim: true,
      maxlength: [150, "Subject cannot exceed 150 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    contactPreference: {
      type: String,
      enum: ["call", "whatsapp", "email"],
      default: "call",
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

