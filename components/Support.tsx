"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Megaphone, Clock, Mail } from 'lucide-react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import { useTranslations } from '@/lib/translations'
SwiperCore.use([Navigation, Autoplay]);

const supportStats = [
  {
    icon: Megaphone,
    value: '97%',
    labelKey: 'support_stat_satisfaction',
    color: 'from-blue-500 to-blue-600',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Clock,
    value: '24/7',
    labelKey: 'support_stat_available',
    color: 'from-yellow-400 to-yellow-500',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    icon: Mail,
    value: '12-24h',
    labelKey: 'support_stat_response',
    color: 'from-cyan-500 to-cyan-600',
    iconColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
]

const avatarImages = [
  'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=320&q=85',
  'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=320&q=85',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=320&q=85',
  'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=320&q=85',
  'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=320&q=85',
]

const dummyReviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing service! The VIN report was detailed and accurate. Saved me from buying a problematic vehicle. Highly recommend!',
    created_at: '2024-12-20',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&auto=format&q=85',
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    comment: 'Fast, reliable, and comprehensive. Got my report in minutes. The information was exactly what I needed to make a confident purchase.',
    created_at: '2024-12-18',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&auto=format&q=85',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    rating: 5,
    comment: 'Best VIN decoder I\'ve used. Customer support was responsive and helpful. Worth every penny!',
    created_at: '2024-12-15',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&h=256&fit=crop&auto=format&q=85',
  },
  {
    id: 4,
    name: 'David Wilson',
    rating: 5,
    comment: 'Trusted by professionals. The detailed history report gave me complete peace of mind before my vehicle purchase.',
    created_at: '2024-12-12',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=256&h=256&fit=crop&auto=format&q=85',
  },
]

export default function Support() {
  const { t } = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-b from-blue-50 to-cyan-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div
            className={`flex justify-center transform transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
            }`}
          >
            <div className="flex items-center -space-x-3">
              {avatarImages.map((image, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 delay-${(index + 1) * 100} ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <img
                      src={image}
                      alt={`Support team member ${index + 1}`}
                      className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-lg object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`space-y-4 transform transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.3]">
              {t('support_heading_pre')}
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent block text-2xl sm:text-3xl md:text-5xl lg:text-5xl">
                {t('support_heading_highlight')}
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-[1.6]">
              {t('support_subtitle_start')}{' '}
              <Link href="/contact-us" className="text-blue-600 hover:text-blue-700 font-semibold underline decoration-2 underline-offset-4 hover:decoration-blue-700 transition-colors duration-300">
                {t('support_cta_link')}
              </Link>{' '}
              {t('support_subtitle_end')}
            </p>
          </div>

          <div
            className={`hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pt-8 transform transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            {supportStats.map((stat, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 delay-${(index + 6) * 100} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>

                  <div className="relative space-y-4">
                    <div className={`inline-flex p-4 rounded-xl ${stat.bgColor} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      <stat.icon className={`w-8 h-8 ${stat.iconColor}`} strokeWidth={2} />
                    </div>

                    <div className="space-y-2">
                      <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <p className="text-xs sm:text-sm md:text-lg text-gray-600 font-medium">
                        {t(stat.labelKey)}
                      </p>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl origin-center`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="block md:hidden pt-8">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="support-stats-swiper"
            >
              {supportStats.map((stat, index) => (
                <SwiperSlide key={index}>
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg min-h-64 flex flex-col justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 rounded-2xl transition-opacity duration-500`}></div>

                    <div className="relative space-y-4">
                      <div className={`inline-flex p-4 rounded-xl ${stat.bgColor} transform transition-all duration-500`}>
                        <stat.icon className={`w-8 h-8 ${stat.iconColor}`} strokeWidth={2} />
                      </div>

                      <div className="space-y-2">
                        <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                          {t(stat.labelKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <style>{`
        :global(.support-stats-swiper .swiper-button-next),
        :global(.support-stats-swiper .swiper-button-prev) {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%);
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        :global(.support-stats-swiper .swiper-button-next:hover),
        :global(.support-stats-swiper .swiper-button-prev:hover) {
          background: linear-gradient(135deg, #0891b2 0%, #0369a1 100%);
          box-shadow: 0 8px 25px rgba(6, 182, 212, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.15);
          border-color: rgba(255, 255, 255, 0.5);
        }

        :global(.support-stats-swiper .swiper-button-next:active),
        :global(.support-stats-swiper .swiper-button-prev:active) {
          transform: translateY(-50%) scale(0.92);
        }

        :global(.support-stats-swiper .swiper-button-next::after),
        :global(.support-stats-swiper .swiper-button-prev::after) {
          font-size: 28px;
          font-weight: 900;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          letter-spacing: 0.5px;
        }

        :global(.support-stats-swiper .swiper-button-next) {
          right: 16px;
        }

        :global(.support-stats-swiper .swiper-button-prev) {
          left: 16px;
        }

        :global(.support-stats-swiper .swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background-color: rgba(209, 213, 219, 0.6);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        :global(.support-stats-swiper .swiper-pagination-bullet:hover) {
          background-color: rgba(209, 213, 219, 0.8);
        }

        :global(.support-stats-swiper .swiper-pagination-bullet-active) {
          background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%);
          width: 28px;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(6, 182, 212, 0.4);
        }

        /* Reviews Swiper Styles */
        :global(.reviews-swiper .swiper-button-next),
        :global(.reviews-swiper .swiper-button-prev) {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%);
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        :global(.reviews-swiper .swiper-button-next:hover),
        :global(.reviews-swiper .swiper-button-prev:hover) {
          background: linear-gradient(135deg, #0891b2 0%, #0369a1 100%);
          box-shadow: 0 8px 25px rgba(6, 182, 212, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-50%) scale(1.15);
          border-color: rgba(255, 255, 255, 0.5);
        }

        :global(.reviews-swiper .swiper-button-next:active),
        :global(.reviews-swiper .swiper-button-prev:active) {
          transform: translateY(-50%) scale(0.92);
        }

        :global(.reviews-swiper .swiper-button-next::after),
        :global(.reviews-swiper .swiper-button-prev::after) {
          font-size: 28px;
          font-weight: 900;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          letter-spacing: 0.5px;
        }

        :global(.reviews-swiper .swiper-button-next) {
          right: 16px;
        }

        :global(.reviews-swiper .swiper-button-prev) {
          left: 16px;
        }

        :global(.reviews-swiper .swiper-pagination-bullet) {
          width: 10px;
          height: 10px;
          background-color: rgba(209, 213, 219, 0.6);
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        :global(.reviews-swiper .swiper-pagination-bullet:hover) {
          background-color: rgba(209, 213, 219, 0.8);
        }

        :global(.reviews-swiper .swiper-pagination-bullet-active) {
          background: linear-gradient(135deg, #06b6d4 0%, #0284c7 100%);
          width: 28px;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(6, 182, 212, 0.4);
        }
      `}</style>
    </section>
  )
}
