"use client"

import React from 'react'

export default function OrderPay({ currency, amount }: { currency?: string; amount?: number | string }) {
  const displayAmount = amount ? Number(amount).toFixed(2) : ''

  return (
    <div className="mt-6 text-center">
      <div className="mb-3 text-sm text-gray-700">Payments are currently disabled</div>
      <div className="text-base font-semibold text-gray-900 mb-2">{currency} {displayAmount}</div>
      <div className="text-sm text-red-600">This checkout option is not available in the current deployment.</div>
    </div>
  )
}
