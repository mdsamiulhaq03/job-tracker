import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      status: "connected",
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      db: mongoose.connection.name,
    });
  } catch (err) {
    return NextResponse.json({ status: "error", error: String(err) }, { status: 500 });
  }
}
