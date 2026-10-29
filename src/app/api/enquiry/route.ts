import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, phone, city } = await req.json();
  if (!name || !phone || !city) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // TODO: send somewhere the client actually checks
  console.log("New franchise enquiry:", { name, phone, city });
  return NextResponse.json({ ok: true });
}
