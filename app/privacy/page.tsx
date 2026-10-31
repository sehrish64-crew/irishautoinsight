import type { Metadata } from 'next'
import PrivacyPageClient from './privacy-client'

export const metadata: Metadata = {
  title: 'Privacy Policy - Irishautoinsights.com',
  description: 'Read our privacy policy to understand how Irishautoinsights.com collects, uses, and protects your personal information.',
  openGraph: {
    title: 'Privacy Policy - Irishautoinsights.com',
    description: 'Our commitment to protecting your personal information and privacy.',
    url: 'https://irishautoinsights.com/privacy',
    type: 'website',
  },
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
