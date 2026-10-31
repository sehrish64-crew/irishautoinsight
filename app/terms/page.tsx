import type { Metadata } from 'next'
import TermsPageClient from './terms-client'

export const metadata: Metadata = {
  title: 'Terms and Conditions - Irishautoinsights.com',
  description: 'Read the terms and conditions for using Irishautoinsights.com services. Understand your rights and responsibilities.',
  openGraph: {
    title: 'Terms and Conditions - Irishautoinsights.com',
    description: 'Our terms explain the rules for using Irishautoinsights.com Digital pdf reports.',
    url: 'https://irishautoinsights.com/terms',
    type: 'website',
  },
}

export default function TermsPage() {
  return <TermsPageClient />
}
