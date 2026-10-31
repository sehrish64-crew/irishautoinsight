export interface CountryEntry {
  code: string
  name: string
  countryCode: string // for flagcdn
  currency: string
  language: string
}

// Supported countries for this website: Ireland and Finland.
export const countriesList: CountryEntry[] = [
  { code: 'IE', name: 'Ireland', countryCode: 'ie', currency: 'EUR', language: 'en' },
  { code: 'FI', name: 'Finland', countryCode: 'fi', currency: 'EUR', language: 'fi' },
]

export default countriesList
