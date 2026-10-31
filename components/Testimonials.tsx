"use client"

import { useState, useEffect, useRef } from 'react'
import { Quote, CheckCircle, User, ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Review } from '@/lib/database'
import { useTranslations } from '@/lib/translations'

type Testimonial = Pick<Review, 'id' | 'name' | 'rating' | 'comment'> & {
  isSample?: boolean
}

const sampleReviews: Testimonial[] = [
  {
    id: -1,
    name: 'Alex M. · Demo',
    rating: 5,
    comment: 'A clear, easy-to-follow vehicle history overview. It helped me know what to check before choosing a used vehicle.',
    isSample: true,
  },
  {
    id: -2,
    name: 'Jordan K. · Demo',
    rating: 5,
    comment: 'Useful checks in one place for comparing vans. The report made it easier to spot which details I should look into further.',
    isSample: true,
  },
  {
    id: -3,
    name: 'Taylor R. · Demo',
    rating: 5,
    comment: 'A handy overview for checking a vehicle’s mileage, damage records and history—useful for private buyers and fleet research alike.',
    isSample: true,
  },
]

export default function Testimonials() {
  const { t } = useTranslations()
  const [isVisible, setIsVisible] = useState(false)
  const [reviews, setReviews] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        if (response.ok) {
          const data: Review[] = await response.json()
          setReviews(data.length > 0 ? data : sampleReviews)
        } else {
          setReviews(sampleReviews)
        }
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setReviews(sampleReviews)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3))
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3))
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const visibleReviews = reviews.slice(currentIndex * 3, currentIndex * 3 + 3)

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-[1.3]">
            {t('testimonials_title')}
          </h2>
          <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto mb-6 leading-[1.6]">
            {t('testimonials_subtitle')}
          </p>
        </div>

        <div
          className={`relative h-80 rounded-3xl overflow-hidden mb-16 shadow-2xl transform transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <video
            src="https://assets.mixkit.co/videos/preview/mixkit-a-car-driving-through-a-city-at-night-41464-large.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-12">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  {t('testimonials_trusted_title')}
                </h3>
                <p className="text-xs sm:text-sm md:text-lg text-white/90 mb-6">
                  {t('testimonials_trusted_subtitle')}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 border-4 border-white flex items-center justify-center"
                      >
                        <User className="w-6 h-6 text-gray-900" />
                      </div>
                    ))}
                  </div>
                  <div className="text-white">
                    <p className="font-bold text-lg sm:text-xl md:text-2xl">5M+</p>
                    <p className="text-xs sm:text-sm text-white/80">{t('testimonials_reports_generated')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

{isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xs sm:text-sm md:text-lg text-gray-600">{t('testimonials_no_reviews')}</p>
          </div>
        ) : (
          <div className="relative">
            {reviews.length > 3 && (
              <>
                <button
                  onClick={prevReview}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-blue-600" />
                </button>
                <button
                  onClick={nextReview}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-blue-600" />
                </button>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {visibleReviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`group transform transition-all duration-700 delay-${(index + 1) * 150} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">

                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>

                    <div className="relative space-y-6">
                      <div className="flex items-start justify-between">
                        <Quote className="w-10 h-10 text-blue-400 group-hover:text-blue-500 transition-colors duration-300" strokeWidth={1.5} />
                        <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full animate-pulse"></div>
                      </div>

                      {renderStars(review.rating)}

                      <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed min-h-[140px]">
                        {review.comment}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <User className="w-6 h-6 text-blue-600" strokeWidth={2} />
                          </div>

                          <div>
                            <p className="font-semibold text-xs sm:text-sm md:text-base text-gray-900">{review.name}</p>
                            {!review.isSample && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <CheckCircle className="w-4 h-4" strokeWidth={2} />
                                <span className="text-2xs sm:text-xs font-medium">{t('testimonials_verified_review')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-2xl origin-left"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
