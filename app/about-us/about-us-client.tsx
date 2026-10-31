"use client"

import { useState, useEffect } from 'react'
import { Shield, Users, Globe2, TrendingUp, CheckCircle2, Database, Clock, Award, Building2, Heart, Zap, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useTranslations } from '@/lib/translations'

const stats = [
  { value: 900, suffix: '+', labelKey: 'about_stat_databases', icon: Database },
  { value: 5, suffix: 'M+', labelKey: 'about_stat_reports', icon: CheckCircle2 },
  { value: 50, suffix: '+', labelKey: 'about_stat_countries', icon: Globe2 },
  { value: 24, suffix: '/7', labelKey: 'about_stat_support', icon: Clock }
]

const values = [
  {
    icon: Shield,
    titleKey: 'about_value_trust_title',
    descriptionKey: 'about_value_trust_desc'
  },
  {
    icon: Users,
    titleKey: 'about_value_customer_title',
    descriptionKey: 'about_value_customer_desc'
  },
  {
    icon: Eye,
    titleKey: 'about_value_visibility_title',
    descriptionKey: 'about_value_visibility_desc'
  },
  {
    icon: Zap,
    titleKey: 'about_value_innovation_title',
    descriptionKey: 'about_value_innovation_desc'
  }
]

export default function AboutUsClient() {
  const { t } = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState([0, 0, 0, 0])

  useEffect(() => {
    setIsVisible(true)

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    const timers = stats.map((stat, index) => {
      let currentValue = 0
      const increment = stat.value / steps

      return setInterval(() => {
        currentValue += increment
        if (currentValue >= stat.value) {
          currentValue = stat.value
          clearInterval(timers[index])
        }
        setCounters(prev => {
          const newCounters = [...prev]
          newCounters[index] = Math.floor(currentValue)
          return newCounters
        })
      }, interval)
    })

    return () => timers.forEach(timer => clearInterval(timer))
  }, [])

  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
          <div className={`max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 bg-blue-50 border border-blue-200 rounded-full">
              <Building2 className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600" />
              <span className="text-2xs sm:text-sm font-semibold text-blue-900">{t('about_badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              {t('about_hero_title')}
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('about_hero_desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto transform transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center space-y-2 sm:space-y-3 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center">
                <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-gray-900">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-600">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-blue-50 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-2xs sm:text-sm font-semibold text-blue-900">{t('about_story_badge')}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {t('about_story_title')}
                </h2>

                <div className="space-y-4 sm:space-y-5 text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                  <p>
                    {t('about_story_p1')}
                  </p>
                  <p>
                    {t('about_story_p2')}
                  </p>
               
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                    <span className="text-2xs sm:text-sm font-medium text-gray-700">{t('about_story_badge2')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
                    <span className="text-2xs sm:text-sm font-medium text-gray-700">{t('about_story_badge3')}</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl sm:rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                  <div className="relative h-72 sm:h-80 md:h-96">
                    <Image
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                      alt="Premium vehicle team"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                  </div>
                  <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t('about_mission_title')}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                        {t('about_mission_desc')}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t('about_vision_title')}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                        {t('about_vision_desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className={`max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 transform transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">{t('about_values_title')}</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              {t('about_values_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4 sm:gap-5 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-lg sm:rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <value.icon className="w-6 sm:w-7 h-6 sm:h-7 text-blue-600" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{t(value.titleKey)}</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">{t(value.descriptionKey)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`max-w-5xl mx-auto space-y-8 sm:space-y-10 md:space-y-12 transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            <div className="text-center space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">{t('about_journey_title')}</h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">{t('about_journey_subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
              <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/3803517/pexels-photo-3803517.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85"
                  alt="Technology innovation"
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{t('about_journey_innovation_title')}</h3>
                    <p className="text-xs sm:text-sm text-white/90">{t('about_journey_innovation_desc')}</p>
                  </div>
                </div>
              </div>
              <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1600&q=85"
                  alt="Vehicle technology"
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{t('about_journey_global_title')}</h3>
                    <p className="text-xs sm:text-sm text-white/90">{t('about_journey_global_desc')}</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className={`relative container mx-auto px-4 sm:px-6 transform transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {t('about_cta_title')}
            </h2>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t('about_cta_desc')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                {t('about_cta_button')}
              </Button>
              {/* <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-sm sm:text-base md:text-lg rounded-lg transition-all duration-300">
                Contact Sales
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
