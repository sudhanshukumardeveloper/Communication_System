import { NextResponse } from "next/server";
import { currentUser } from "@/lib/access";
import { db } from "@/lib/db";

async function member(roomId: string, userId: string) {
  return db.roomMember.findUnique({ where: { roomId_userId: { roomId, userId } } });
}

export async function GET(_request: Request, context: { params: Promise<{ roomId: string }> }) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { roomId } = await context.params;
  if (!(await member(roomId, user.id))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const messages = await db.message.findMany({ where: { roomId }, include: { sender: { select: { id: true, displayName: true, avatarUrl: true } }, attachment: true }, orderBy: { createdAt: "asc" }, take: 100 });
  return NextResponse.json({ messages });
}

export async function POST(request: Request, context: { params: Promise<{ roomId: string }> }) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  const { roomId } = await context.params;
  if (!(await member(roomId, user.id))) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  try {
    const body = await request.json();
    const text = typeof body.body === "string" ? body.body.trim() : "";
    if (!text || text.length > 10000) return NextResponse.json({ error: "Message must be 1–10,000 characters" }, { status: 400 });
    const message = await db.message.create({ data: { roomId, senderId: user.id, type: "TEXT", body: text }, include: { sender: { select: { id: true, displayName: true, avatarUrl: true } } } });
    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
