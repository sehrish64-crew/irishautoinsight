import type { Metadata } from 'next'
import RefundPolicyPageClient from './refund-policy-client'

export const metadata: Metadata = {
  title: 'Refund Policy - Irishautoinsights.com',
  description: 'Learn about Irishautoinsights.com refund policy and how to request a refund for your Digital pdf report.',
  openGraph: {
    title: 'Refund Policy - Irishautoinsights.com',
    description: 'Our customer-friendly refund policy details.',
    url: 'https://irishautoinsights.com/refund-policy',
    type: 'website',
  },
}

export default function RefundPolicyPage() {
  return <RefundPolicyPageClient />
}
