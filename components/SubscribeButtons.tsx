"use client"

import React from 'react'

const packages = [
  { key: 'basic', name: 'Basic Plan' },
  { key: 'standard', name: 'Standard Plan' },
  { key: 'premium', name: 'Premium Plan' },
]

export default function SubscribeButtons() {
  const handleCheckout = async () => {
    alert('Payment checkout has been disabled in this deployment.')
  }

  return (
    <div className="flex flex-col gap-3">
      {packages.map((pkg) => (
        <button
          key={pkg.key}
          onClick={handleCheckout}
          className="px-4 py-2 rounded bg-gray-400 text-white cursor-not-allowed"
          disabled
        >
          Subscription Disabled
        </button>
      ))}
    </div>
  )
}
