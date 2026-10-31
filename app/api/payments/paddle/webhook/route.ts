import { NextRequest, NextResponse } from 'next/server'
import { updateOrderPaymentStatus, getOrderById } from '@/lib/database'

// Paddle v2 webhook handler - verify signature and update order
export async function POST(req: NextRequest) {
  console.warn('Payments/paddle webhook disabled: Paddle integration removed')
  return NextResponse.json({ success: false, message: 'Paddle integration removed' }, { status: 410 })
}
