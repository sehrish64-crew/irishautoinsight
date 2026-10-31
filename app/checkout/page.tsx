import React from 'react'

export const metadata = {
  title: 'Checkout Disabled | Digital pdf report',
  description: 'Checkout has been disabled and payment flows have been removed from this deployment.',
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout Disabled</h1>
          <p className="text-gray-600 text-lg">
            The checkout flow has been removed from this site. If you need assistance, please contact support for next steps.
          </p>
        </div>
      </div>
    </div>
  )
}
