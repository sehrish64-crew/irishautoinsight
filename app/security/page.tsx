import type { Metadata } from 'next'
import SecurityPageClient from './security-client'

export const metadata: Metadata = {
  title: 'Security - Irishautoinsights.com',
  description: 'Learn about Irishautoinsights.com security measures protecting your vehicle history data with industry-leading encryption and privacy standards.',
  openGraph: {
    title: 'Security - Irishautoinsights.com',
    description: 'Our commitment to data security and privacy.',
    url: 'https://irishautoinsights.com/security',
    type: 'website',
  },
}

export default function SecurityPage() {
  return <SecurityPageClient />
}
