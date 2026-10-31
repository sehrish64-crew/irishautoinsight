import { NextResponse } from 'next/server'

// GET: optional passthrough for debugging (kept minimal)
export async function GET(req: Request) {
  return NextResponse.json({ success: false, message: 'Paddle integration removed' }, { status: 410 })
}

export async function POST(req: Request) {
  return NextResponse.json({ success: false, message: 'Paddle integration removed' }, { status: 410 })
}
