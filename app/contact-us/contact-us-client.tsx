'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, Car, MessageCircle, Clock } from 'lucide-react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTranslations } from '@/lib/translations'
import { parseJsonSafe } from '@/lib/utils'

const contactInfo = [
  {
    icon: Mail,
    titleKey: 'contact_info_email',
    details: ['Info@irishautoinsights.com'],
    gradient: 'from-blue-500 to-cyan-500'
  },

  {
    icon: MapPin,
    titleKey: 'contact_info_office',
    details: ['351A GREEN STREET LONDON ENGLAND E13 9AR'],
    gradient: 'from-blue-600 to-blue-500'
  }
]

export default function ContactUsClient() {
  const { t } = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      let data
      try {
        data = await parseJsonSafe(response)
      } catch (err) {
        console.error('Failed to parse contact form response:', err)
        throw new Error('Failed to submit form (invalid server response)')
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : t('contact_send_error'))
      console.error('Error submitting form:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-96" style={{ backgroundColor: '#d7f0ff' }}></div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div ref={heroRef} className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className={`grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center mb-12 sm:mb-16 md:mb-20 transform transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-sm">
                <MessageCircle className="w-3 sm:w-4 h-3 sm:h-4 text-blue-600" />
                <span className="text-2xs sm:text-sm font-semibold text-blue-900">{t('contact_get_in_touch')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                {t('contact_title')}
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                {t('contact_subtitle')}
              </p>

              <div className="flex items-center gap-2 sm:gap-3 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white flex items-center justify-center">
                    <Car className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 border-2 border-white flex items-center justify-center">
                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 text-gray-900" />
                  </div>
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-white flex items-center justify-center">
                    <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-2xs sm:text-sm font-semibold text-gray-900">{t('contact_quick_response')}</p>
                  <p className="text-2xs sm:text-xs text-gray-600">{t('contact_response_time')}</p>
                </div>
              </div>
            </div>

            <div className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-blue-100">
                  <div className="relative h-64 w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85"
                      alt="Car inspection"
                      fill
                      className="object-cover"
                      quality={90}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <MessageCircle className="w-8 h-8 text-gray-900" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 md:p-8 text-center space-y-2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{t('contact_help_title')}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{t('contact_help_subtitle')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`group transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 4) * 150}ms` }}
              >
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${info.gradient}`}></div>
                  <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                    <div className={`inline-flex p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${info.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2">{t(info.titleKey)}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className={`text-gray-600 ${idx === 0 ? 'font-medium text-2xs sm:text-xs md:text-sm' : 'text-2xs sm:text-xs'}`}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div ref={formRef} className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
                  {t('contact_form_heading')}
                </h2>
                <p className="text-xs sm:text-sm text-blue-50">{t('contact_form_subtitle')}</p>
              </div>

              <div className="p-4 sm:p-6 md:p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-2xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        {t('contact_label_name')}
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('contact_placeholder_name')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full h-10 sm:h-12 text-sm transition-all duration-300 ${
                          focusedField === 'name' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                        }`}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-2xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                        {t('contact_label_email')}
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('contact_placeholder_email')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full h-10 sm:h-12 text-sm transition-all duration-300 ${
                          focusedField === 'email' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-2xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      {t('contact_label_subject')}
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder={t('contact_placeholder_subject')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full h-10 sm:h-12 text-sm transition-all duration-300 ${
                        focusedField === 'subject' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                      }`}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-2xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      {t('contact_label_message')}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={t('contact_placeholder_message')}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={`w-full min-h-32 sm:min-h-40 md:min-h-48 text-sm transition-all duration-300 ${
                        focusedField === 'message' ? 'ring-2 ring-blue-500 border-blue-500' : ''
                      }`}
                    />
                  </div>

                  {submitSuccess && (
                    <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-2xs sm:text-sm text-green-600 font-semibold">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  )}

                  {submitError && (
                    <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-2xs sm:text-sm text-red-600">{submitError}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 sm:py-4 px-6 sm:px-12 rounded-lg sm:rounded-xl text-xs sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>{isSubmitting ? t('contact_sending') : t('contact_send')}</span>
                      <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className={`mt-12 sm:mt-16 text-center transform transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-50 border border-blue-200 rounded-full">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              <span className="text-2xs sm:text-sm font-semibold text-blue-900">
                Average response time: 2-4 hours during business hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
