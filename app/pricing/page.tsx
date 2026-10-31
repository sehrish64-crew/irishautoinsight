import { Metadata } from 'next'
import { cookies } from 'next/headers'
import PricingClient from './pricing-client'
import { getTranslationsForLang } from '@/lib/translations'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  let lang = 'en'
  try {
    const ck = await cookies()
    const langCookie = ck.get('cv_locale')
    if (langCookie?.value) {
      lang = langCookie.value
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[i18n] Could not read cv_locale cookie in pricing page metadata:', e)
    }
  }

  const tmap = getTranslationsForLang(lang)
  const title = tmap['pricing_choose_plan']
    ? `Irishautoinsights.com - ${tmap['pricing_choose_plan']}`
    : 'Pricing Plans - Irishautoinsights.com Digital pdf reports'
  const description = tmap['pricing_subtitle'] ||
    'Affordable Digital pdf report pricing plans. Premium reports starting from $29. Find the perfect plan for your needs.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://irishautoinsights.com/pricing',
      type: 'website',
    },
  }
}

export default function Pricing() {
  return <PricingClient />
}
