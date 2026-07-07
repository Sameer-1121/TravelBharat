import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { placesData as defaultPlacesData, statesInfo as defaultStatesInfo } from '../../data/placesData'

const STORAGE_KEY = 'tb_places_data'
const VERSION_KEY = 'tb_places_data_version'

// ─── IMPORTANT ────────────────────────────────────────────────
// Bump this number any time you manually edit placesData.js
// (add/remove places, change images, etc.) so that everyone's
// browser automatically picks up the fresh file instead of using
// their old cached localStorage copy.
const DATA_VERSION = "3"

// ─── HELPERS ──────────────────────────────────────────────────
const loadFromStorage = () => {
  try {
    const savedVersion = localStorage.getItem(VERSION_KEY)

    // If the code's data version doesn't match what's cached,
    // the placesData.js file was edited manually — throw away
    // the old cache and use the fresh file instead.
    if (savedVersion !== DATA_VERSION) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(VERSION_KEY, DATA_VERSION)
      return defaultPlacesData
    }

    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Failed to load places from storage', e)
  }
  return defaultPlacesData
}

const saveToStorage = (places) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places))
    localStorage.setItem(VERSION_KEY, DATA_VERSION)
  } catch (e) {
    console.error('Failed to save places to storage', e)
  }
}

// ─── CONTEXT ──────────────────────────────────────────────────
// Single source of truth for places data across the WHOLE app.
// Public pages (States, Destinations, PlaceDetail, Categories) read from here.
// Admin Panel writes to here. Both stay in sync because it's one Context,
// not separate hook instances.
//
// Auto-cache-invalidation: bump DATA_VERSION above whenever you edit
// placesData.js by hand, so browsers automatically pick up the new file
// instead of serving stale localStorage data.
const PlacesDataContext = createContext()

export const PlacesDataProvider = ({ children }) => {
  const [places, setPlaces] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(places)
  }, [places])

  const addPlace = useCallback((place) => {
    setPlaces((prev) => [...prev, place])
  }, [])

  const updatePlace = useCallback((id, updatedFields) => {
    setPlaces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    )
  }, [])

  const deletePlace = useCallback((id) => {
    setPlaces((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const resetToDefault = useCallback(() => {
    setPlaces(defaultPlacesData)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.setItem(VERSION_KEY, DATA_VERSION)
  }, [])

  const getPlaceById = useCallback(
    (id) => places.find((p) => p.id === id),
    [places]
  )

  return (
    <PlacesDataContext.Provider
      value={{
        places,
        addPlace,
        updatePlace,
        deletePlace,
        resetToDefault,
        getPlaceById,
        statesInfo: defaultStatesInfo,
      }}
    >
      {children}
    </PlacesDataContext.Provider>
  )
}

// Use this hook anywhere instead of importing placesData.js directly
export const usePlacesStore = () => {
  const context = useContext(PlacesDataContext)
  if (!context) {
    throw new Error('usePlacesStore must be used within a PlacesDataProvider')
  }
  return context
}