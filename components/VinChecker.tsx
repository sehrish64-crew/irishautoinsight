"use client"

import { useState, useEffect, useRef } from 'react'
import { Info, CheckCircle, Key, Hash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import GetReportForm from './GetReportForm'
import { useTranslations } from '@/lib/translations'

// const trustLogos = [
//   { name: 'AutoBild', width: 'w-20' },
//   { name: 'TopGear', width: 'w-20' },
//   { name: 'Forbes', width: 'w-20' },
//   { name: 'REUTERS', width: 'w-20' },
// ]

export default function VinChecker() {
  const [vin, setVin] = useState('')
  const [vinError, setVinError] = useState('')
  const [vehicleIdType, setVehicleIdType] = useState<'vin' | 'plate'>('vin')
  const [plate, setPlate] = useState('')
  const [plateError, setPlateError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslations()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          className={`relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/50 via-transparent to-cyan-400/30"></div>

          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>

          <div className="relative px-6 md:px-12 lg:px-16 py-12 md:py-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div
              className={`space-y-6 transform transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {t('vin_checker_title')}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-blue-50 leading-relaxed">
                  {t('vin_checker_subtitle')}
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2 text-blue-50">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-xs sm:text-sm md:text-base font-medium">
                    {t('vin_checker_trusted')}
                  </span>
                </div>

                {/* <div className="flex flex-wrap items-center justify-start gap-3 md:gap-6 pt-2">
                  {trustLogos.map((logo, index) => (
                    <div
                      key={logo.name}
                      className={`transform transition-all duration-500 delay-${(index + 3) * 100} ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 min-w-max">
                        <span className={`text-white font-bold ${logo.width} block text-center text-2xs sm:text-xs md:text-sm`}>
                          {logo.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            <div
              className={`space-y-4 transform transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <div
                className={`bg-white rounded-2xl shadow-2xl p-4 transform transition-all duration-500 ${
                  isFocused ? 'scale-105 shadow-cyan-400/50' : 'scale-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="inline-flex items-center bg-[#8787871a] p-1 rounded-full gap-1">
                    <button suppressHydrationWarning type="button" onClick={() => setVehicleIdType('vin')} className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${vehicleIdType === 'vin' ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 shadow' : 'text-black hover:bg-white/10'}`}>
                      <Key className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('vin_checker_by_vin')}</span>
                    </button>
                    <button suppressHydrationWarning type="button" onClick={() => setVehicleIdType('plate')} className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${vehicleIdType === 'plate' ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow' : 'text-black hover:bg-white/10'}`}>
                      <Hash className="w-4 h-4" />
                      <span className="text-sm font-medium">{t('vin_checker_by_plate')}</span>
                    </button>
                  </div>
                  <div className="text-sm text-white/70">{vehicleIdType === 'vin' ? 'VIN' : t('vin_checker_by_plate')}</div>
                </div>

                <div className="mb-3">
                  <div className="relative">
                    {vehicleIdType === 'vin' ? (
                      <>
                        <Input
                          suppressHydrationWarning
                          type="text"
                          placeholder={t('vin_placeholder')}
                          value={vin}
                          onChange={(e) => { setVin(e.target.value.toUpperCase()); if (vinError) setVinError('') }}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-6 py-6 bg-transparent placeholder:text-gray-400"
                          maxLength={17}
                        />
                        {vinError && (
                          <p className="text-xs text-red-500 mt-1">{vinError}</p>
                        )}
                        {vin.length > 0 && (
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div suppressHydrationWarning className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <Info className="w-4 h-4 text-blue-600" strokeWidth={2} />
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Input
                          suppressHydrationWarning
                          type="text"
                          placeholder={t('vin_checker_plate_placeholder')}
                          value={plate}
                          onChange={(e) => { setPlate(e.target.value.toUpperCase()); if (plateError) setPlateError('') }}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => setIsFocused(false)}
                          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-6 py-6 bg-transparent placeholder:text-gray-400"
                        />
                        {plateError && (
                          <p className="text-xs text-red-500 mt-1">{plateError}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-2 flex justify-start">
                  <Button
                    size="lg"
                    onClick={() => {
                      if (vehicleIdType === 'vin' && !vin.trim()) {
                        setVinError(t('vin_checker_vin_error'))
                        setIsFocused(true)
                        setTimeout(() => setIsFocused(false), 500)
                        return
                      }
                      if (vehicleIdType === 'plate' && !plate.trim()) {
                        setPlateError(t('vin_checker_plate_error'))
                        setIsFocused(true)
                        setTimeout(() => setIsFocused(false), 500)
                        return
                      }
                      setIsFormOpen(true)
                    }}
                    disabled={vehicleIdType === 'vin' ? !vin.trim() : !plate.trim()}
                    className={`bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${(vehicleIdType === 'vin' ? (!vin.trim()) : (!plate.trim())) ? 'opacity-60 cursor-not-allowed hover:scale-100' : ''}`}
                  >
                    {t('vin_get_report')}
                  </Button>
                </div>

                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>


              <p className="text-blue-50/80 text-sm text-center">
                {t('vin_placeholder')}
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        </div>
      </div>

      <GetReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        prefilledIdentType={vehicleIdType}
        prefilledIdentValue={vehicleIdType === 'vin' ? vin : plate}
      />
    </section>
  )
}
