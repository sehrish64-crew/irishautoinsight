"use client"

import { useState, useEffect } from 'react'
import { useCountry } from '@/contexts/CountryContext'
import { useTranslations } from '@/lib/translations'
import { MapPin } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function LocationPopup() {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const { t } = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const { countries } = require('@/contexts/CountryContext')

  const [filteredCountries, setFilteredCountries] = useState(countries)
  const [isOpen, setIsOpen] = useState(false)

  const searchParams = useSearchParams()

  // run on mount / when search params change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasShown = localStorage.getItem('locationPopupShown')
      const forceShow = searchParams?.get('showLocationPopup') === 'true'
      if (!hasShown || forceShow) {
        setIsOpen(true)
        if (!forceShow) {
          localStorage.setItem('locationPopupShown', 'true')
        }
      }
    }
  }, [searchParams])

  // Filter helper
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      setFilteredCountries(countries)
    } else {
      const q = query.toLowerCase()
      setFilteredCountries(
        countries.filter((country: any) =>
          country.name.toLowerCase().includes(q) ||
          country.code.toLowerCase().includes(q) ||
          country.currency.toLowerCase().includes(q)
        )
      )
    }
  }

  const handleSelectCountry = (country: any) => {
    setSelectedCountry(country)
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-2xl font-bold text-white">{t('location_change_title')}</h2>
              <p className="text-blue-100 text-sm">{t('location_change_subtitle')}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-blue-600 rounded-lg transition text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Search Box */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <input
              type="text"
              placeholder={t('location_search_placeholder')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Countries List */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country: any) => (
                <button
                  key={country.code}
                  onClick={() => handleSelectCountry(country)}
                  className={`p-3 rounded-lg text-left transition-all ${
                    selectedCountry.code === country.code
                      ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="font-semibold">{country.name}</div>
                  <div className={`text-sm ${selectedCountry.code === country.code ? 'text-blue-100' : 'text-gray-600'}`}>
                    {country.currency} • {country.code}
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-2 text-center py-8 text-gray-500">
                <p>{t('location_no_countries').replace('{query}', searchQuery)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {t('location_currently_selected')} <span className="font-semibold">{selectedCountry.name}</span>
          </p>
          <button
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            {t('button_done')}
          </button>
        </div>
      </div>
    </div>
  )
}
