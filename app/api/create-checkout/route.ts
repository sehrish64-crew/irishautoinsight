import { NextResponse } from 'next/server'

/**
 * POST /api/create-checkout
 * 
 * Generic checkout helper route.
 * 
 * This route accepts a product identifier and returns the identifier back
 * to the client for subsequent checkout/payment handling.
 * 
 * Request body:
 *   { productId: string }
 * 
 * Response:
 *   { priceId: string } - Resolved checkout price identifier
 *   { error: string } - Error message if failed
 */

interface CheckoutRequest {
  productId: string
}

interface CheckoutResponse {
  jwt?: string
  error?: string
  details?: any
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CheckoutRequest
    const { productId } = body

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid productId' }, { status: 400 })
    }

    // Return the resolved checkout price identifier for the client.
    return NextResponse.json({ priceId: productId })
  } catch (err: any) {
    console.error('[create-checkout] ❌', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
