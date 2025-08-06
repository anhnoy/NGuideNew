// Google Maps API types
declare global {
  interface Window {
    google?: {
      maps: {
        Map: any
        Marker: any
        InfoWindow: any
        places: {
          PlacesService: any
          AutocompleteService: any
        }
      }
    }
  }
}

export {}
