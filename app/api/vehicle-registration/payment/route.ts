import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/database'

export async function POST(req: NextRequest) {
  try {
    const { registrationId, price, currency } = await req.json()

    if (!registrationId || !price || !currency) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify registration exists
    const result = await query(
      'SELECT id FROM vehicle_registrations WHERE id = ? AND payment_status = ?',
      [registrationId, 'pending']
    )
    const registrations = result.rows

    if ((registrations as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Registration not found or already paid' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { success: false, message: 'Payment integration removed' },
      { status: 410 }
    )
  } catch (error) {
    console.error('Error initiating payment:', error)
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}
