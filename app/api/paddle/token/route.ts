import { NextResponse } from 'next/server'

// Server route to generate a Paddle sandbox client token (ctok_...)
// This calls Paddle vendors API server-side using PADDLE_API_KEY (vendor_auth_code)
export async function GET() {
  return NextResponse.json({ success: false, message: 'Paddle integration removed' }, { status: 410 })
}
