import { NextRequest, NextResponse } from 'next/server'

// This endpoint is disabled because server-side checkout creation is no longer supported.
export async function POST(request: NextRequest) {
  return NextResponse.json({ success: false, message: 'Payment integration removed' }, { status: 410 })
}
