export type LocationId = 'taipei' | 'la' | 'sf'

export type LocationPoint = {
  id: LocationId
  location: [number, number]
  label: string
  notes: string
  current?: boolean
}

/** Cities marked on the bio globe. Set current: true for the active city. */
export const LOCATION_POINTS: LocationPoint[] = [
  {
    id: 'taipei',
    location: [25.033, 121.5654],
    label: 'Taipei',
    notes: 'Raised in Taiwan.',
  },
  {
    id: 'sf',
    location: [37.7749, -122.4194],
    label: 'San Francisco',
    notes: 'Based in the Bay Area.',
    current: true,
  },
  {
    id: 'la',
    location: [34.0522, -118.2437],
    label: 'Los Angeles',
    notes: 'CS at University of Southern California.',
  },
]
