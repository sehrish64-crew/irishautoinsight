"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from '@/lib/translations'

export default function HowItWorks() {
  const { t } = useTranslations()
  const [visibleSteps, setVisibleSteps] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: '1',
      titleKey: 'howitworks_step1_title',
      descKey: 'howitworks_step1_desc',
      linkKey: 'howitworks_step1_link',
      color: 'from-blue-400 to-blue-600',
    },
    {
      number: '2',
      titleKey: 'howitworks_step2_title',
      descKey: 'howitworks_step2_desc',
      linkKey: 'howitworks_step2_link',
      color: 'from-cyan-400 to-cyan-600',
    },
    {
      number: '3',
      titleKey: 'howitworks_step3_title',
      descKey: 'howitworks_step3_desc',
      linkKey: 'howitworks_step3_link',
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      number: '4',
      titleKey: 'howitworks_step4_title',
      descKey: 'howitworks_step4_desc',
      linkKey: 'howitworks_step4_link',
      color: 'from-purple-400 to-purple-600',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index])
              }, index * 150)
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 px-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-[1.3]">
            {t('howitworks_title')}
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-[1.6] px-2">
            {t('howitworks_subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index)

            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 px-3 sm:px-0 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <div className="flex gap-3 sm:gap-4 md:gap-6 items-start">
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                    <div className={`relative w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 bg-gradient-to-br ${step.color} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}>
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>

                  <div className="flex-1 pt-0">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-2.5 md:mb-3 group-hover:text-blue-600 transition-colors leading-[1.35]">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed mb-2.5 sm:mb-3 md:mb-4">
                      {t(step.descKey)}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-0.5 sm:gap-1 md:gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group/link text-xs sm:text-xs md:text-sm"
                    >
                      {t(step.linkKey)}
                      <ArrowRight className="w-2.5 sm:w-3 md:w-4 h-2.5 sm:h-3 md:h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -bottom-6 left-10 w-0.5 h-12 bg-gradient-to-b from-blue-200 to-transparent"></div>
                )}
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-10 sm:mt-12 md:mt-16 transform transition-all duration-1000 delay-700 px-4 sm:px-0 ${
          visibleSteps.length === steps.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <Link href="/pricing" className="group relative inline-flex w-full sm:w-auto justify-center px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 overflow-hidden">
            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
              {t('howitworks_cta')}
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  )
}
