import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const userId = (session.user as { id: string }).id;
  const { coverImage } = await req.json();

  await UserModel.findByIdAndUpdate(userId, { coverImage });
  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const userId = (session.user as { id: string }).id;
  await UserModel.findByIdAndUpdate(userId, { coverImage: null });
  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const userId = (session.user as { id: string }).id;
  const user = await UserModel.findById(userId).select("coverImage").lean();
  return NextResponse.json({ coverImage: (user as { coverImage?: string })?.coverImage ?? null });
}
