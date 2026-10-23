import { LngLatBounds, Map as MapLibreMap, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl'
import type { FilterSpecification } from 'maplibre-gl'
import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson'
import { RotateCcw } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import boundaryJson from '../data/san-fernando-barangays.geojson?raw'
import { barangayMap } from '../data/barangayMap'
import { barangays } from '../data/barangays'
import 'maplibre-gl/dist/maplibre-gl.css'

setWorkerUrl(workerUrl)

const mapFeaturesByName = new Map<string, (typeof barangayMap.features)[number]>(
  barangayMap.features.map((feature) => [feature.name, feature]),
)
const boundaryNameAliases: Record<string, string> = {
  'Barangay I (Pob.)': 'Barangay I',
  'Barangay II (Pob.)': 'Barangay II',
  'Barangay III (Pob.)': 'Barangay III',
  'Barangay IV (Pob.)': 'Barangay IV',
  'Cabaroan (Negro)': 'Cabaroan',
}
const barangaysBySlug = new Map<string, (typeof barangays)[number]>(barangays.map((barangay) => [barangay.slug, barangay]))
const sourceGeoJson = JSON.parse(boundaryJson) as FeatureCollection<Geometry, GeoJsonProperties>
const populationColors = ['#dcecf7', '#b6d8ed', '#83b9dd', '#4f95c3', '#246889']

function getPopulationColor(population: number) {
  if (population > 8_000) return populationColors[4]
  if (population > 5_000) return populationColors[3]
  if (population > 2_500) return populationColors[2]
  if (population > 1_000) return populationColors[1]
  return populationColors[0]
}

const features = sourceGeoJson.features.flatMap((feature) => {
  const name = String(feature.properties?.ADM4_EN ?? '')
  const mapFeature = mapFeaturesByName.get(boundaryNameAliases[name] ?? name)
  const barangay = mapFeature ? barangaysBySlug.get(mapFeature.slug) : undefined
  if (!mapFeature || !barangay) return []

  return [{
    ...feature,
    id: mapFeature.slug,
    properties: {
      ...feature.properties,
      slug: mapFeature.slug,
      name: mapFeature.name,
      population2024: barangay.population2024,
      populationColor: getPopulationColor(barangay.population2024),
      areaSqKm: mapFeature.areaSqKm,
    },
  }]
})

const boundaryData: FeatureCollection<Geometry, GeoJsonProperties> = {
  type: 'FeatureCollection',
  features,
}

function extendBounds(bounds: LngLatBounds, coordinates: unknown) {
  if (!Array.isArray(coordinates)) return
  if (typeof coordinates[0] === 'number' && typeof coordinates[1] === 'number') {
    bounds.extend([coordinates[0], coordinates[1]])
    return
  }
  coordinates.forEach((coordinate) => extendBounds(bounds, coordinate))
}

function getFeatureBounds(geometry: Geometry) {
  const bounds = new LngLatBounds()
  if (geometry.type === 'GeometryCollection') {
    geometry.geometries.forEach((item) => extendBounds(bounds, 'coordinates' in item ? item.coordinates : null))
  } else {
    extendBounds(bounds, geometry.coordinates)
  }
  return bounds.isEmpty() ? null : bounds
}

const cityBounds = new LngLatBounds()
boundaryData.features.forEach((feature) => {
  const bounds = getFeatureBounds(feature.geometry)
  if (bounds) {
    cityBounds.extend(bounds.getSouthWest())
    cityBounds.extend(bounds.getNorthEast())
  }
})
const overviewPadding = { top: 32, right: 56, bottom: 96, left: 56 }
const panBuffer = 0.02
const mapPanBounds = new LngLatBounds(
  [cityBounds.getWest() - panBuffer, cityBounds.getSouth() - panBuffer],
  [cityBounds.getEast() + panBuffer, cityBounds.getNorth() + panBuffer],
)

const mapColors = {
  population: populationColors,
  hover: '#f4c36e',
  selected: '#e29a45',
}

interface BarangayMapCanvasProps {
  resetToken: number
  onSelect: (slug: string | null) => void
  onHover: (slug: string | null) => void
}

export function BarangayMapCanvas({ resetToken, onSelect, onHover }: BarangayMapCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const labelMarkerRef = useRef<Marker | null>(null)
  const selectedSlugRef = useRef<string | null>(null)
  const hoveredSlugRef = useRef<string | null>(null)

  const clearSelection = useCallback(() => {
    const map = mapRef.current
    if (!map || !map.isStyleLoaded()) return
    selectedSlugRef.current = null
    hoveredSlugRef.current = null
    map.setFilter('barangay-selected-fill', ['==', ['get', 'slug'], '__none__'])
    map.setFilter('barangay-selected-extrusion', ['==', ['get', 'slug'], '__none__'])
    map.setFilter('barangay-hover-fill', ['==', ['get', 'slug'], '__none__'])
    map.setPaintProperty('barangay-outlines', 'line-opacity', 0.92)
    map.setLayoutProperty('barangay-labels', 'visibility', 'visible')
    labelMarkerRef.current?.remove()
    onSelect(null)
    onHover(null)
    map.fitBounds(cityBounds, { padding: overviewPadding, pitch: 30, bearing: 0, duration: 650 })
  }, [onHover, onSelect])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const map = new MapLibreMap({
      container,
      style: {
        version: 8,
        glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
        sources: {},
        layers: [{
          id: 'map-background',
          type: 'background',
          paint: { 'background-color': '#e9eff1' },
        }],
      },
      center: cityBounds.getCenter(),
      zoom: 11,
      pitch: 30,
      bearing: 0,
      minZoom: 10,
      maxZoom: 17,
      maxPitch: 60,
      maxBounds: mapPanBounds,
      renderWorldCopies: false,
      dragPan: true,
      dragRotate: false,
      pitchWithRotate: false,
      scrollZoom: true,
      touchZoomRotate: true,
      attributionControl: false,
    })
    mapRef.current = map
    map.addControl(new NavigationControl({ showCompass: false }), 'top-right')

    const label = document.createElement('div')
    label.className = 'rounded-full bg-[#28485f] px-3 py-1 text-xs font-bold text-white shadow-lg ring-2 ring-white/90'
    label.style.pointerEvents = 'none'
    const labelMarker = new Marker({ element: label, anchor: 'center' })
    labelMarkerRef.current = labelMarker

    const emptyFilter: FilterSpecification = ['==', ['get', 'slug'], '__none__']
    const filterForSlug = (slug: string | null): FilterSpecification => ['==', ['get', 'slug'], slug ?? '__none__']

    const clearHover = () => {
      hoveredSlugRef.current = null
      if (map.getLayer('barangay-hover-fill')) map.setFilter('barangay-hover-fill', emptyFilter)
      onHover(null)
    }

    map.on('load', () => {
      map.addSource('barangays', {
        type: 'geojson',
        data: boundaryData,
        promoteId: 'slug',
      })

      map.addLayer({
        id: 'barangay-fills',
        type: 'fill',
        source: 'barangays',
        paint: {
          'fill-color': ['get', 'populationColor'],
          'fill-opacity': 0.9,
        },
      })

      map.addLayer({
        id: 'barangay-hover-fill',
        type: 'fill',
        source: 'barangays',
        filter: emptyFilter,
        paint: {
          'fill-color': mapColors.hover,
          'fill-opacity': 0.92,
        },
      })

      map.addLayer({
        id: 'barangay-selected-fill',
        type: 'fill',
        source: 'barangays',
        filter: emptyFilter,
        paint: {
          'fill-color': mapColors.selected,
          'fill-opacity': 1,
        },
      })

      map.addLayer({
        id: 'barangay-outlines',
        type: 'line',
        source: 'barangays',
        paint: {
          'line-color': '#ffffff',
          'line-width': 1,
          'line-opacity': 0.92,
        },
      })

      map.addLayer({
        id: 'barangay-selected-extrusion',
        type: 'fill-extrusion',
        source: 'barangays',
        filter: emptyFilter,
        paint: {
          'fill-extrusion-color': mapColors.selected,
          'fill-extrusion-height': 200,
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 1,
          'fill-extrusion-vertical-gradient': true,
        },
      })

      map.addLayer({
        id: 'barangay-labels',
        type: 'symbol',
        source: 'barangays',
        minzoom: 10,
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['Noto Sans Bold'],
          'text-size': ['interpolate', ['linear'], ['zoom'], 10, 7, 12, 8.5, 15, 10.5],
          'text-max-width': 7,
          'text-padding': 1,
          'text-allow-overlap': false,
          'text-ignore-placement': false,
          'symbol-sort-key': ['-', ['get', 'areaSqKm']],
          'text-optional': true,
          'text-pitch-alignment': 'viewport',
          'text-rotation-alignment': 'viewport',
        },
        paint: {
          'text-color': '#183b50',
          'text-halo-color': '#ffffff',
          'text-halo-width': 1.3,
          'text-halo-blur': 0.2,
        },
      })

      map.fitBounds(cityBounds, { padding: overviewPadding, pitch: 30, bearing: 0, duration: 0 })

      map.on('click', 'barangay-fills', (event) => {
        const feature = event.features?.[0]
        const slug = String(feature?.properties?.slug ?? '')
        if (!slug || !feature) return
        if (selectedSlugRef.current === slug) {
          clearSelection()
          return
        }

        selectedSlugRef.current = slug
        hoveredSlugRef.current = null
        map.setFilter('barangay-selected-fill', filterForSlug(slug))
        map.setFilter('barangay-selected-extrusion', filterForSlug(slug))
        map.setFilter('barangay-hover-fill', emptyFilter)
        map.setPaintProperty('barangay-outlines', 'line-opacity', 0.55)
        map.setLayoutProperty('barangay-labels', 'visibility', 'none')
        onSelect(slug)
        onHover(null)

        const bounds = getFeatureBounds(feature.geometry)
        if (!bounds) return
        const center = bounds.getCenter()
        label.textContent = String(feature.properties?.name ?? '')
        labelMarker.setLngLat(center).addTo(map)
        map.fitBounds(bounds, {
          padding: { top: 84, right: 84, bottom: 84, left: 84 },
          maxZoom: 14.7,
          pitch: 50,
          bearing: -22,
          duration: 1250,
        })
      })

      map.on('mousemove', 'barangay-fills', (event) => {
        const feature = event.features?.[0]
        const rawSlug = feature?.properties?.slug
        const nextSlug = rawSlug ? String(rawSlug) : null
        if (hoveredSlugRef.current !== nextSlug) {
          hoveredSlugRef.current = nextSlug
          map.setFilter(
            'barangay-hover-fill',
            nextSlug && nextSlug !== selectedSlugRef.current ? filterForSlug(nextSlug) : emptyFilter,
          )
          onHover(nextSlug)
        }
        map.getCanvas().style.cursor = 'pointer'
      })

      map.on('mouseleave', 'barangay-fills', () => {
        map.getCanvas().style.cursor = ''
        clearHover()
      })
    })

    return () => {
      labelMarker.remove()
      map.remove()
      mapRef.current = null
      labelMarkerRef.current = null
      selectedSlugRef.current = null
      hoveredSlugRef.current = null
    }
  }, [clearSelection, onHover, onSelect])

  useEffect(() => {
    if (resetToken > 0) clearSelection()
  }, [resetToken, clearSelection])

  return (
    <div className="relative isolate h-[27rem] overflow-hidden rounded-2xl bg-[#e9eff1] sm:h-[32rem]">
      <div className="absolute inset-0">
        <div
          ref={containerRef}
          className="h-full w-full"
          data-lenis-prevent-wheel
          role="application"
          aria-label="Interactive 3D map of San Fernando barangays. Scroll to zoom, drag to pan, click a barangay to select it."
        />
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-lg bg-white/90 px-2.5 py-1.5 text-[10px] font-semibold text-ink-600 shadow-sm backdrop-blur-sm">
        Scroll to zoom · drag to pan
      </div>
      <button
        type="button"
        onClick={clearSelection}
        title="Reset map view"
        aria-label="Reset map view"
        className="absolute right-2.5 top-[5.5rem] z-10 inline-flex size-11 items-center justify-center rounded-md bg-white text-ink-700 shadow-md ring-1 ring-black/10 transition hover:bg-surface"
      >
        <RotateCcw aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  )
}
