'use client'

import { useEffect, useState } from 'react'
import { X, HelpCircle, Key, Hash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCountry } from '@/contexts/CountryContext'
import countriesList from '@/lib/countries'
import { Input as TextInput } from '@/components/ui/input'
import { useTranslations } from '@/lib/translations'
import { parseJsonSafe } from '@/lib/utils'
import { getPrice, formatCurrency } from '@/lib/prices'

interface GetReportFormProps {
  isOpen: boolean
  onClose: () => void
  preselectedPackage?: string
  prefilledIdentType?: 'vin' | 'plate'
  prefilledIdentValue?: string
}

const vehicleTypes = ['Car', 'Motorcycle', 'Truck', 'Boat', 'ATV', 'Campervan', 'RV', 'Travel Trailer', 'Fifth Wheel', 'Toy Hauler', 'JETSKI']
const packages = [
  {
    id: 'basic',
    name: 'Basic Report',
    stripeUrl: 'https://buy.stripe.com/9B6dR9axN0Nx1JPcMybo405',
  },
  {
    id: 'standard',
    name: 'Standard Report',
    stripeUrl: 'https://buy.stripe.com/cNi4gzcFVgMv0FL8wibo406',
  },
  {
    id: 'premium',
    name: 'Premium Report',
    stripeUrl: 'https://buy.stripe.com/aFabJ121heEn0FL3bYbo407',
  },
]

export default function GetReportForm({ isOpen, onClose, preselectedPackage, prefilledIdentType, prefilledIdentValue }: GetReportFormProps) {
  const { selectedCountry, setSelectedCountry } = useCountry()
  const { t } = useTranslations()
  const [vehicleIdType, setVehicleIdType] = useState<'vin' | 'plate'>('vin')
  const [vehicleType, setVehicleType] = useState('')
  const [vinNumber, setVinNumber] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(preselectedPackage || '')
  const [selectedCountryCode, setSelectedCountryCode] = useState(selectedCountry?.code || 'IE')
  const [countryFilter, setCountryFilter] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Pre-fill package
  useEffect(() => { if (preselectedPackage) setSelectedPackage(preselectedPackage) }, [preselectedPackage])
  useEffect(() => { if (prefilledIdentType && prefilledIdentValue) { setVehicleIdType(prefilledIdentType); prefilledIdentType === 'vin' ? setVinNumber(prefilledIdentValue.toUpperCase()) : setPlateNumber(prefilledIdentValue.toUpperCase()) } }, [prefilledIdentType, prefilledIdentValue])
  useEffect(() => { if (selectedCountry && selectedCountry.code !== selectedCountryCode) setSelectedCountryCode(selectedCountry.code) }, [selectedCountry])

  const validateForm = () => {
    setError('')
    if (!vehicleType) return setError(t('form_error_vehicle_type')), false
    if (vehicleIdType === 'vin' && !vinNumber) return setError(t('form_error_vin')), false
    if (vehicleIdType === 'plate' && !plateNumber) return setError(t('form_error_plate')), false
    if (!customerEmail) return setError(t('form_error_email')), false
    if (!selectedPackage) return setError(t('form_error_package')), false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)


    const selectedPkg = packages.find((p) => p.id === selectedPackage)

    try {
      const requestBody = {
        customer_email: customerEmail,
        vehicle_type: vehicleType,
        vin_number: vehicleIdType === 'vin' ? vinNumber : null,
        identification_type: vehicleIdType,
        identification_value: vehicleIdType === 'vin' ? vinNumber : plateNumber,
        package_type: selectedPackage,
        country_code: selectedCountryCode,
        currency: selectedCountry.currency,
        amount: getPrice(selectedPackage as any, selectedCountry.currency),
      }

      const res = await fetch('/api/orders/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) })
      const data = await res.json()
      if (!res.ok || !data.orderId) throw new Error(data.error || 'Order creation failed')

      // If the selected package has a Stripe URL, redirect there after creating the order
      if (selectedPkg && selectedPkg.stripeUrl) {
        if (typeof window !== 'undefined') {
          // Optionally append orderId as a query param if needed: `?orderId=${data.orderId}`
          window.location.href = selectedPkg.stripeUrl
        }
        return
      }

      setSuccessMessage(t('order_success_message'))
      onClose()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t('order_failure_message')
      setError(errorMessage)
      console.error('❌ Error in handleSubmit:', errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-[9999] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              {t('form_title')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="block text-sm font-semibold text-gray-900 mb-2">
                {t('form_search_by')}
              </Label>
              <div className="mb-2">
                <div className="inline-flex items-center bg-gray-100 rounded-full p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setVehicleIdType('vin')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                      vehicleIdType === 'vin'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 shadow'
                        : 'text-black hover:bg-gray-200'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('vin_checker_by_vin')}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleIdType('plate')}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                      vehicleIdType === 'plate'
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow'
                        : 'text-black hover:bg-gray-200'
                    }`}
                  >
                    <Hash className="w-4 h-4" />
                    <span className="text-sm font-medium">{t('vin_checker_by_plate')}</span>
                  </button>
                </div>
              </div>
            </div>

            {vehicleIdType === 'vin' ? (
              <div>
                <Label htmlFor="vin" className="block text-sm font-semibold text-gray-900 mb-2">
                  {t('form_vin_number')}
                </Label>
                <div className="relative">
                  <Input
                    id="vin"
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                    placeholder={t('form_vin_number_placeholder')}
                    required
                    className="h-12 pr-10"
                    maxLength={17}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <HelpCircle className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t('form_vin_help_text')}
                </p>
              </div>
            ) : (
              <div>
                <Label
                  htmlFor="plate"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  {t('form_plate_number')}
                </Label>
                <Input
                  id="plate"
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder={t('vin_checker_plate_placeholder')}
                  required
                  className="h-12"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {t('form_plate_help_text')}
                </p>
              </div>
            )}

            <div>
              <Label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('form_vehicle_type')}
              </Label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t('form_vehicle_type_placeholder')} />
                </SelectTrigger>
                <SelectContent className="z-[10000]">
                  {vehicleTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                {t('form_email_address')}
              </Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder={t('form_email_placeholder')}
                required
                className="h-12"
              />
            </div>

            <div>
              <Label className="block text-sm font-semibold text-gray-900 mb-2">{t('form_country')}</Label>
              <Select
                value={selectedCountryCode}
                onValueChange={(v) => {
                  setSelectedCountryCode(v)
                  const found = countriesList.find((c) => c.code === v)
                  if (found) setSelectedCountry(found)
                }}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t('select_country')} />
                </SelectTrigger>
                <SelectContent className="z-[10000] max-h-60 overflow-auto">
                  <div className="p-2">
                    <TextInput
                      value={countryFilter}
                      onChange={(e) => setCountryFilter(e.target.value)}
                      placeholder={t('location_search_placeholder')}
                      className="mb-2 h-9"
                    />
                  </div>
                  {countriesList
                    .filter(
                      (c) =>
                        c.name.toLowerCase().includes(countryFilter.toLowerCase()) ||
                        c.code.toLowerCase().includes(countryFilter.toLowerCase())
                    )
                    .map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

          

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 h-12"
                disabled={isSubmitting}
              >
                {t('form_cancel')}
              </Button>
              <Button
                type="submit"
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !selectedPackage}
              >
                {isSubmitting
                  ? t('form_processing')
                  : `${t('form_continue')} - ${
                      selectedPackage
                        ? formatCurrency(
                            getPrice(selectedPackage as any, selectedCountry.currency),
                            selectedCountry.currency
                          )
                        : '$0'
                    }`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}