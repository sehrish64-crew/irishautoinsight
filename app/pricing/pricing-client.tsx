"use client"

import { useState, useEffect, useRef } from 'react'
import { Check, Sparkles, Zap, Crown, Shield, TrendingUp, Clock } from 'lucide-react'
import Image from 'next/image'
import { useCountry } from '@/contexts/CountryContext'
import { useTranslations } from '@/lib/translations'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'
import GetReportForm from '@/components/GetReportForm'

import { PRICING_MAP, CURRENCY_SYMBOLS, getPrice, formatCurrency } from '@/lib/prices'

// Note: PRICING_MAP, CURRENCY_SYMBOLS and utility `getPrice` are now provided by `lib/prices`


const basePricingPlans = [
  {
    nameKey: 'pricing_plan_premium_name',
    badge: 'GOLD',
    badgeColor: 'bg-yellow-400',
    priceKey: 'premium' as const,
    icon: Crown,
    popular: false,
    borderColor: 'border-yellow-400',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    features: [
      'pricing_feature_all_premium',
      'pricing_feature_accident_records',
      'pricing_feature_theft_records',
      'pricing_feature_salvage_records',
      'pricing_feature_open_recalls',
      'pricing_feature_odometer_readings',
      'pricing_feature_loan_details',
      'pricing_feature_possible_market_value',
      'pricing_feature_additional_specification',
    ],
    buttonTextKey: 'pricing_select_plan',
  },
  {
    nameKey: 'pricing_plan_basic_name',
    badge: 'MOST POPULAR',
    badgeColor: 'bg-blue-600',
    priceKey: 'basic' as const,
    icon: Zap,
    popular: true,
    borderColor: 'border-blue-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    features: [
      'pricing_feature_all_basic',
      'pricing_feature_accident_records',
      'pricing_feature_theft_records',
      'pricing_feature_salvage_records',
      'pricing_feature_open_recalls',
      'pricing_feature_lease_records',
    ],
    buttonTextKey: 'pricing_select_plan',
  },
  {
    nameKey: 'pricing_plan_standard_name',
    badge: 'DIAMOND',
    badgeColor: 'bg-cyan-500',
    priceKey: 'standard' as const,
    icon: Sparkles,
    popular: false,
    borderColor: 'border-cyan-500',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    features: [
      'pricing_feature_all_standard',
      'pricing_feature_accident_records',
      'pricing_feature_theft_records',
      'pricing_feature_salvage_records',
      'pricing_feature_open_recalls',
      'pricing_feature_odometer_readings',
      'pricing_feature_loan_details',
      'pricing_feature_possible_market_value',
    ],
    buttonTextKey: 'pricing_select_plan',
  },
]

const trustBadges = [
  {
    icon: Shield,
    titleKey: 'trust_secure_title',
    descKey: 'trust_secure_desc',
  },
  {
    icon: TrendingUp,
    titleKey: 'trust_money_title',
    descKey: 'trust_money_desc',
  },
  {
    icon: Clock,
    titleKey: 'trust_instant_title',
    descKey: 'trust_instant_desc',
  },
]

export default function PricingClient() {
  const { selectedCountry } = useCountry()
  const { t } = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const sectionRef = useRef<HTMLDivElement>(null)

  const currencySymbol = CURRENCY_SYMBOLS[selectedCountry.currency] || '€'
  const pricing = PRICING_MAP[selectedCountry.currency] || PRICING_MAP['EUR']

  const pricingPlans = basePricingPlans.map(plan => ({
    ...plan,
    price: formatCurrency(pricing[plan.priceKey], selectedCountry.currency, `${selectedCountry.language}-${selectedCountry.code}`),
    currency: currencySymbol,
  }))

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

  const handleSelectPlan = (planKey: string) => {
    setSelectedPlan(planKey)
    setIsFormOpen(true)
  }

  return (
    <>
      <div ref={sectionRef} className="relative bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32" style={{ backgroundColor: '#d7f0ff' }}></div>

        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div
                className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
                  }`}
              >
                <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-50 border border-blue-200 rounded-full">
                  <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600" />
                  <span className="text-2xs sm:text-sm font-semibold text-blue-900">{t('pricing_simple_title')}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                  {t('pricing_choose_plan')}
                </h1>

                <p className="text-xs sm:text-base md:text-xl text-gray-700 leading-relaxed">
                  {t('pricing_subtitle')}
                </p>
              </div>

              <div
                className={`relative h-60 sm:h-80 md:h-96 rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
              >
                <Image
                  src="https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1600&q=85"
                  alt="Premium vehicle"
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    {t('pricing_protect_title')}
                  </h3>
                  <p className="text-2xs sm:text-xs md:text-sm text-white/90">
                    {t('pricing_protect_desc')}
                  </p>
                  <p className="text-center text-sm text-gray-600">{t('pricing_one_time_notice')}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    } ${plan.popular ? 'lg:scale-[1.08]' : ''}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredPlan(index)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <div
                    className={`relative h-full bg-white rounded-2xl transition-all duration-500 overflow-hidden ${hoveredPlan === index
                      ? 'shadow-2xl scale-[1.02]'
                      : 'shadow-lg'
                      } border-2 ${plan.borderColor}`}
                  >
                    <div className="absolute top-0 left-0 z-10">
                      <div className={`${plan.badgeColor} text-white font-bold px-3 sm:px-4 py-1.5 sm:py-2 text-2xs sm:text-xs rounded-br-xl shadow-lg`}>
                        {plan.badge}
                      </div>
                    </div>

                    <div className="relative p-6 sm:p-8 space-y-6 sm:space-y-8">
                      <div className="space-y-4 sm:space-y-6 text-center pt-4 sm:pt-6">
                        <div className={`inline-flex p-3 sm:p-4 rounded-xl ${plan.iconBg} shadow-sm`}>
                          <plan.icon className={`w-6 sm:w-8 h-6 sm:h-8 ${plan.iconColor}`} strokeWidth={2.5} />
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{t(plan.nameKey)}</h3>

                        <div className="" style={{ marginTop: "12px" }}>
                          <div className="flex items-start justify-center gap-1">
                            <span className="text-lg sm:text-2xl font-bold text-gray-900 pt-2">
                              {plan.currency}
                            </span>
                            <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
                              {plan.price}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm font-semibold mt-2">{t('pricing_one_time_payment')}</p>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3 pt-4">
                        {plan.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start gap-2 sm:gap-3"
                          >
                            <div
                              className={`flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5`}
                            >
                              <Check className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-blue-600" strokeWidth={3} />
                            </div>
                            <span className="text-2xs sm:text-sm text-gray-700 font-medium leading-relaxed">{t(feature)}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleSelectPlan(plan.priceKey)}
                        className={`relative w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-xs sm:text-base overflow-hidden group transition-all duration-300 ${plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                          : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900 shadow-md hover:shadow-lg'
                          } hover:scale-105`}
                      >
                        <span className="relative z-10">
                          {t(plan.buttonTextKey)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`text-center space-y-8 pt-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                {trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
                  >
                    <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
                      <badge.icon className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" strokeWidth={2} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-0.5 sm:mb-1">{t(badge.titleKey)}</h4>
                      <p className="text-2xs sm:text-sm text-gray-600">{t(badge.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div> */}

              {/* <p className="text-xs sm:text-sm md:text-base text-gray-700">
                {t('pricing_need_custom')}{' '}
                <a href="/contact-us" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                  {t('pricing_contact_cta')}
                </a>
              </p> */}
              <div>
                <ul>
                      <li>
                        <p className='font-bold text-1xl text-gray-600'>
                          {t('pricing_one_time_notice')}
                        </p>
                      </li>
                      <li>
                        <p className='font-bold text-1xl text-gray-600'>
                          {t('pricing_refund_notice')}
                        </p>
                      </li>
                  <li>
                    <p className='font-bold text-1xl text-gray-600'>
                      {t('pricing_digital_notice')}
                    </p>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GetReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        preselectedPackage={selectedPlan}
      />

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('faq_title')}
            </h2>
            <p className="text-xs sm:text-sm md:text-lg text-gray-600">
              {t('faq_subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                <span className="text-blue-600 font-bold text-base sm:text-lg mt-1">Q1.</span>
                <span>{t('faq_q1_title')}</span>
              </h3>
              <p className="text-2xs sm:text-sm text-gray-600 leading-relaxed">
                {t('faq_q1_desc')}
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                <span className="text-blue-600 font-bold text-base sm:text-lg mt-1">Q2.</span>
                <span>{t('faq_q2_title')}</span>
              </h3>
              <p className="text-2xs sm:text-sm text-gray-600 leading-relaxed">
                {t('faq_q2_desc')}
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                <span className="text-blue-600 font-bold text-base sm:text-lg mt-1">Q3.</span>
                <span>{t('faq_q3_title')}</span>
              </h3>
              <p className="text-2xs sm:text-sm text-gray-600 leading-relaxed">
                {t('faq_q3_desc')}
              </p>
            </div>

            {/* Question 4 */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                <span className="text-blue-600 font-bold text-base sm:text-lg mt-1">Q4.</span>
                <span>{t('faq_q4_title')}</span>
              </h3>
              <p className="text-2xs sm:text-sm text-gray-600 leading-relaxed">
                {t('faq_q4_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Testimonials />
    </>
  )
}
