import { NextResponse } from 'next/server';

export async function GET() {
    // Your GET handler
    return NextResponse.json({ message: 'Hello' });
}

export async function POST() {
    // Your POST handler
    return NextResponse.json({ message: 'Posted' });
} 