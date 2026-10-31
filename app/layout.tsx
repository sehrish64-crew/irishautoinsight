export const dynamic = 'force-dynamic'

import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { DM_Sans } from 'next/font/google';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getOrganizationSchema } from '@/lib/schema';

const dmSans = DM_Sans({
  subsets: ['latin'],
});

// Use dynamic metadata so server-rendered metadata can be localized via cookie
export async function generateMetadata(): Promise<Metadata> {
  const { getTranslationsForLang } = await import('@/lib/translations')

  // Resolve language robustly: try cookies(), then headers(), with defensive checks for different runtime shapes.
  let lang = 'en'
  try {
    const nh = await import('next/headers')

    // 1) Try cookies() if available (handle both sync and Promise shapes)
    if (typeof nh.cookies === 'function') {
      const ckCandidate = nh.cookies()
      const ck = await Promise.resolve(ckCandidate)
      if (ck) {
        if (typeof ck.get === 'function') {
          const c = ck.get('cv_locale')
          if (c && (c as any).value) lang = (c as any).value
        } else if ((ck as any)['cv_locale']) {
          const c = (ck as any)['cv_locale']
          if (typeof c === 'string') lang = c
          else if (c && c.value) lang = c.value
        }
      }
    }

    // 2) Fallback: try headers() and parse cookie header (handle Promise or sync)
    if (lang === 'en' && typeof nh.headers === 'function') {
      const hCandidate = nh.headers()
      const h = await Promise.resolve(hCandidate)
      const cookieHeader = typeof h.get === 'function' ? (h.get('cookie') || h.get('Cookie') || '') : ((h as any)['cookie'] || (h as any)['Cookie'] || '')
      const match = (cookieHeader || '').match(/(?:^|; )cv_locale=([^;]+)/)
      if (match) lang = decodeURIComponent(match[1])
    }
  } catch (e) {
    // ignore and keep default lang
    if (process.env.NODE_ENV !== 'production') console.warn('[i18n] Could not read cookies/headers in generateMetadata:', e)
  }

  const tmap = getTranslationsForLang(lang)

  return {
    metadataBase: new URL('https://irishautoinsights.com'),
    title: `Irishautoinsights.com - ${tmap['banner_title'] || "Check any car's history"}`,
    description: tmap['banner_subtitle'] || "VIN Check Can Save You Thousands — Get a Full Digital pdf report",
    keywords: ['car history', 'vehicle report', 'VIN check', 'used car', 'vehicle history check', 'car background check'],
    authors: [{ name: 'Irishautoinsights.com' }],
    creator: 'Irishautoinsights.com',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
        { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: '/favicon.png',
    },
    openGraph: {
      type: 'website',
      url: 'https://irishautoinsights.com',
      title: `Irishautoinsights.com - ${tmap['banner_title'] || "Check any car's history"}`,
      description: tmap['banner_subtitle'] || "VIN Check Can Save You Thousands — Get a Full Digital pdf report",
      siteName: 'Irishautoinsights.com',
      images: [
        { url: '/banner-background.jpg', width: 2000, height: 1334, alt: 'Car on the road' },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Irishautoinsights.com - ${tmap['banner_title'] || "Check any car's history"}`,
      description: tmap['banner_subtitle'] || "VIN Check Can Save You Thousands — Get a Full Digital pdf report",
      images: [
        { url: '/banner-background.jpg', alt: 'Car on the road' },
      ],
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaMarkup = getOrganizationSchema();
  let htmlLang = 'en'

  try {
    const ckCandidate = cookies()
    const ck = await Promise.resolve(ckCandidate)
    const langCookie = typeof ck?.get === 'function' ? ck.get('cv_locale') : undefined
    if (langCookie && typeof langCookie.value === 'string') {
      htmlLang = langCookie.value
    }
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[i18n] Could not read cookies in RootLayout:', e)
    }
  }

  return (
    <html lang={htmlLang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <link rel="canonical" href="https://irishautoinsights.com" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
        <link rel="icon" href="/favicon-192.png" sizes="192x192" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body suppressHydrationWarning className={dmSans.className}>
        <LayoutWrapper>
          <main>{children}</main>
        </LayoutWrapper>
      </body>
    </html>
  );
}
