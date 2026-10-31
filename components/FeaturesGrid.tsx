"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, TrendingUp, FileText, AlertTriangle, Zap, Shield } from 'lucide-react'
import { useTranslations } from '@/lib/translations'

export default function FeaturesGrid() {
  const { t } = useTranslations()
  const [activeTab, setActiveTab] = useState('odometer')
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const tabs = [
    { id: 'odometer', labelKey: 'features_tab_odometer' },
    { id: 'ownership', labelKey: 'features_tab_ownership' },
    { id: 'photos', labelKey: 'features_tab_photos' },
    { id: 'damage', labelKey: 'features_tab_damage' },
    { id: 'technical', labelKey: 'features_tab_technical' },
    { id: 'stolen', labelKey: 'features_tab_stolen' },
  ]

  // Auto-cycle through tabs
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.findIndex((tab) => tab.id === prevTab)
        const nextIndex = (currentIndex + 1) % tabs.length
        return tabs[nextIndex].id
      })
    }, 5000) // Change tab every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, tabs])

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 animate-fade-in px-2 sm:px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-[1.2]">
            {t('features_section_heading')}
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
            {t('features_section_subtitle')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div 
          className="flex overflow-x-auto gap-2 sm:gap-4 md:gap-8 mb-0 border-b border-gray-200 pb-0 animate-fade-in-up" 
          style={{ animationDelay: '0.1s' }}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {tabs.map((tab) => (
            <div key={tab.id} className="relative min-w-max md:flex-initial">
              <button
                onClick={() => {
                  setActiveTab(tab.id)
                  setIsAutoPlay(false)
                }}
                className={`text-xs sm:text-sm md:text-base font-semibold whitespace-nowrap pb-3 sm:pb-4 px-2 sm:px-3 md:px-4 transition-all duration-300 relative group ${
                  activeTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t(tab.labelKey)}
              </button>
              
              {/* Loader Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden w-full">
                {activeTab === tab.id && isAutoPlay && (
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 rounded-full"
                    style={{
                      animation: 'tabProgress 5s linear forwards',
                      width: '100%',
                    }}
                  ></div>
                )}
                {activeTab === tab.id && !isAutoPlay && (
                  <div className="h-full w-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content Section - Add top padding to prevent overlap */}
        <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16">
        {activeTab === 'odometer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Left Side - Image */}
             <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/odometer-check-en@1x.webp"
                alt={t('features_odometer_title')}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Right Side - Content */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-blue-100 rounded-xl sm:rounded-2xl">
                <TrendingUp className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-blue-600" strokeWidth={2} />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
                  {t('features_odometer_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('features_odometer_desc')}
                </p>
              </div>

              {/* Data Table */}
              {/* <div className="bg-gray-50 rounded-lg sm:rounded-xl overflow-x-auto border border-gray-200">
                <table className="w-full text-2xs sm:text-xs md:text-sm">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">Date</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">Mileage</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-semibold text-gray-700">Provider</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 hover:bg-white transition">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium">07/14/2021</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"></span>
                          44,952 mi
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 text-2xs sm:text-xs">VIN provided</td>
                    </tr>
                    <tr className="border-b border-gray-100 hover:bg-white transition">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium">08/18/2013</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-500 rounded-full"></span>
                          44,862 mi
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 text-2xs sm:text-xs">UNCHKIN</td>
                    </tr>
                    <tr className="hover:bg-white transition">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 font-medium">02/04/2015</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-red-500 rounded-full"></span>
                          75,898 mi
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-600 text-2xs sm:text-xs">Arizona Department of Environmental Quality</td>
                    </tr>
                  </tbody>
                </table>
              </div> */}

              {/* CTA Button */}
              <Link href="/pricing" className="inline-flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {t('features_check_your_car_cta')}
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'ownership' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/ownership.webp"
                alt={t('features_ownership_title')}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-cyan-100 rounded-xl sm:rounded-2xl">
                <FileText className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-cyan-600" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
                  {t('features_ownership_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('features_ownership_desc')}
                </p>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-1 sm:gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {t('features_check_ownership_cta')}
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/photos-sale.webp"
                alt={t('features_photos_title')}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-purple-100 rounded-xl sm:rounded-2xl">
                <Zap className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-purple-600" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
                  {t('features_photos_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('features_photos_desc')}
                </p>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-1 sm:gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {t('features_view_photos_cta')}
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'damage' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/damage.webp"
                alt={t('features_damage_title')}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-red-100 rounded-xl sm:rounded-2xl">
                <AlertTriangle className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-red-600" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
                  {t('features_damage_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('features_damage_desc')}
                </p>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-1 sm:gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {t('features_check_damage_cta')}
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/specification.webp"
                alt={t('features_technical_title')}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-indigo-100 rounded-xl sm:rounded-2xl">
                <Zap className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-indigo-600" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
                  {t('features_technical_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('features_technical_desc')}
                </p>
              </div>
              <button className="inline-flex items-center gap-1 sm:gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {t('features_view_specs_cta')}
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stolen' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
              <Image
                src="/stolen.webp"
                alt={t('features_stolen_title')}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="inline-flex items-center justify-center w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-amber-100 rounded-xl sm:rounded-2xl">
                <Shield className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-amber-600" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 sm:mb-2.5 md:mb-3">
                  {t('features_stolen_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                  {t('features_stolen_desc')}
                </p>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-1 sm:gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-full transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl text-sm sm:text-base">
                {t('features_verify_status_cta')}
                <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </Link>
            </div>
          </div>
        )}
        </div>

        {/* NMVTIS Badge */}
        {/* <div className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl flex items-start gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-blue-100 rounded-full flex-shrink-0">
            <span className="text-lg sm:text-xl">✓</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{t('features_badge_title')}</h4>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t('features_badge_desc')}
            </p>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes autoTabProgress {
          from {
            width: 0%;
            opacity: 1;
          }
          to {
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes tabProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}
