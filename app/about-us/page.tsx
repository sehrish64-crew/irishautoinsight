import { Metadata } from 'next'
import AboutUsClient from './about-us-client'

export const metadata: Metadata = {
  title: 'About Irishautoinsights.com - Vehicle History Transparency',
  description:
    'Learn how Irishautoinsights.com is driving transparency in the automotive industry with blockchain-powered Digital pdf reports from 900+ global databases.',
  openGraph: {
    title: 'About Irishautoinsights.com - Vehicle History Transparency',
    description:
      'Learn how Irishautoinsights.com is driving transparency in the automotive industry with blockchain-powered Digital pdf reports from 900+ global databases.',
    url: 'https://irishautoinsights.com/about-us',
    type: 'website',
  },
}

export default function AboutUs() {
  return <AboutUsClient />
}
