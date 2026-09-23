import { NextResponse } from "next/server";
import crypto from "node:crypto";

function createCredential(username: string, secret: string) {
  return crypto.createHmac("sha1", secret).update(username).digest("base64");
}

export async function GET() {
  const secret = process.env.TURN_SECRET;
  const urls = (process.env.TURN_URLS || "").split(",").filter(Boolean);
  const realm = process.env.TURN_REALM || "localhost";

  if (!secret || urls.length === 0) {
    return NextResponse.json({ error: "TURN service is not configured" }, { status: 503 });
  }

  const expiry = Math.floor(Date.now() / 1000) + 3600;
  const username = `${expiry}:web-client`;
  const credential = createCredential(username, secret);

  return NextResponse.json({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls, username, credential }
    ],
    realm
  });
}
