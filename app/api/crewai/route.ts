import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'Posted' });
}

