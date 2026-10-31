"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Country {
  code: string
  name: string
  countryCode: string
  currency: string
  language: string
}

import countriesList from '@/lib/countries'

export const countries: Country[] = countriesList


interface CountryContextType {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({ children }: { children: ReactNode }) {
  const defaultCountry = countries.find(c => c.code === 'IE') || countries[0]
  const [selectedCountry, setSelectedCountryState] = useState<Country>(defaultCountry)

  if (process.env.NODE_ENV !== 'production') {
    // quick debug: how many countries are available
    console.log('[i18n] Loaded countries count:', countries.length)
  }

  // Restore persisted country selection on mount, or auto-detect by browser locale
  useEffect(() => {
    try {
      const savedCode = typeof window !== 'undefined' ? localStorage.getItem('selectedCountryCode') : null
      const savedCountry = savedCode ? countries.find(c => c.code === savedCode) : null
      let activeCountry = savedCountry || defaultCountry

      if (!savedCountry && typeof document !== 'undefined') {
        const match = document.cookie.match(/(?:^|; )cv_locale=([^;]+)/)
        if (match) {
          const lang = decodeURIComponent(match[1])
          const cookieCountry = countries.find(c => c.language === lang)
          if (cookieCountry) {
            activeCountry = cookieCountry
          }
        }
      }

      if (!savedCountry && activeCountry === defaultCountry && typeof navigator !== 'undefined') {
        const browserLang = navigator.language?.toLowerCase() || ''
        if (browserLang.startsWith('fi') || browserLang.includes('-fi')) {
          const fiCountry = countries.find(c => c.code === 'FI')
          if (fiCountry) {
            activeCountry = fiCountry
          }
        } else if (browserLang.startsWith('en-ie') || browserLang === 'en-ie' || browserLang.includes('-ie')) {
          const ieCountry = countries.find(c => c.code === 'IE')
          if (ieCountry) {
            activeCountry = ieCountry
          }
        }
      }

      setSelectedCountryState(activeCountry)
      if (typeof document !== 'undefined') {
        document.cookie = `cv_locale=${activeCountry.language}; path=/; max-age=${60 * 60 * 24 * 365}`
        document.documentElement.lang = activeCountry.language
      }
    } catch (e) {
      // ignore localStorage / cookie errors
    }
  }, [defaultCountry])

  const setSelectedCountry = (country: Country) => {
    setSelectedCountryState(country)
    try {
      localStorage.setItem('selectedCountryCode', country.code)
      // Also write a cookie so server-rendered pages can pick up the selected language
      document.cookie = `cv_locale=${country.language}; path=/; max-age=${60 * 60 * 24 * 365}`
      document.documentElement.lang = country.language
    } catch (e) {
      // ignore localStorage / cookie errors
    }
    // Dev log to help debugging language switching
    if (process.env.NODE_ENV !== 'production') {
      console.log('[i18n] Selected country:', country.code, 'language:', country.language)
    }
  }

  return (
    <CountryContext.Provider value={{ selectedCountry: selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider')
  }
  return context
}
