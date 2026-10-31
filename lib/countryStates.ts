export type StateEntry = { code: string; name: string }

// Only include state/region lists for supported countries (IE, FI).
const IE: StateEntry[] = []
const FI: StateEntry[] = []

const mapping: Record<string, StateEntry[]> = {
  IE,
  FI,
}

export function getStatesForCountry(countryCode: string): StateEntry[] {
  if (!countryCode) return []
  const upper = countryCode.toUpperCase()
  return mapping[upper] || []
}

export default getStatesForCountry
