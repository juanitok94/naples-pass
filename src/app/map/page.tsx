// /src/app/map/page.tsx
'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import shopsData from '@/data/shops.json'
import layersData from '@/data/layers.json'
import { getStamps, type StampRecord } from '@/lib/stamps'

const shops = shopsData as any[]
const layers = layersData as any[]

// Naples stops run north (high lat) to south (low lat).
// Project latitude → horizontal position: north = left, south = right.
const allLats = shops.map(s => s.coordinates[1])
const minLat = Math.min(...allLats)
const maxLat = Math.max(...allLats)
const latSpan = maxLat - minLat || 1

function latToPercent(lat: number, flip: boolean): number {
  // Default: North (high lat) = left, South (low lat) = right
  const pct = ((maxLat - lat) / latSpan) * 100
  return flip ? 100 - pct : pct
}

// Latitude boundary between Fifth Ave corridor (stops 1-6) and Third St (stops 7-10)
// Roughly between The Cafe (~26.1420) and Tony's (~26.1388)
const CORRIDOR_LAT = 26.1400

// Sort core stops for the route line
const coreStops = shops
  .filter(s => s.passportType === 'core')
  .sort((a, b) => a.passportStop - b.passportStop)

const bonusStops = shops.filter(s => s.passportType === 'bonus')

export default function MapPage() {
  const [stamps, setStamps] = useState<StampRecord>({})
  const [mounted, setMounted] = useState(false)
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['coffee']))
  const [selectedStop, setSelectedStop] = useState<string | null>(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    setStamps(getStamps())
    setMounted(true)
  }, [])

  useEffect(() => {
    const sync = () => setStamps(getStamps())
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [])

  function toggleLayer(layerId: string) {
    setActiveLayers(prev => {
      const next = new Set(prev)
      if (next.has(layerId)) {
        if (layerId === 'coffee') return next
        next.delete(layerId)
      } else {
        next.add(layerId)
      }
      return next
    })
  }

  const visibleShops = useMemo(() => {
    return shops.filter(s => {
      if (s.passportType === 'core' || s.passportType === 'bonus') return true
      return s.layers.some((l: string) => activeLayers.has(l))
    })
  }, [activeLayers])

  const selectedShop = selectedStop ? shops.find(s => s.id === selectedStop) : null
  const coreStamped = coreStops.filter(s => stamps[s.id]).length

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#0d1f3c]">

      {/* HEADER */}
      <div className="bg-[#0d1f3c] px-6 py-6 text-center border-b-4 border-[#c9a060]">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-widest text-[#c9a060] opacity-60
                     hover:opacity-100 transition-opacity uppercase"
        >
          ← Old Naples Passport
        </Link>
        <h1 className="font-serif text-3xl font-black text-[#f5f0e8] mt-2">
          The Map
        </h1>
        <p className="text-[#c9a060] text-sm italic mt-1 opacity-70">
          10 stops. Two streets. End at the pier.
        </p>
      </div>

      {/* LAYER FILTERS */}
      <div className="max-w-2xl mx-auto px-4 pt-5">
        <p className="text-center font-mono text-[10px] tracking-widest text-[#1a3560] opacity-50 uppercase mb-3">
          Tap to filter · Coffee always on
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {layers.map(layer => {
            const active = activeLayers.has(layer.id)
            return (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono
                  transition-all border
                  ${active
                    ? 'text-white border-transparent'
                    : 'bg-transparent border-[#1a3560]/20 text-[#1a3560] opacity-50 hover:opacity-80'
                  }
                  ${layer.id === 'coffee' ? 'ring-1 ring-[#c9a060]/30' : ''}
                `}
                style={active ? { backgroundColor: layer.color } : {}}
              >
                <span>{layer.icon}</span>
                <span>{layer.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* MAP CONTAINER */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="relative bg-white/40 border border-[#1a3560]/15 rounded-sm p-4 overflow-hidden">

          {/* Direction labels + flip toggle */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-[9px] tracking-widest text-[#1a3560] opacity-40 uppercase">
              {flipped ? '← South' : '← North'}
            </span>
            <button
              onClick={() => setFlipped(f => !f)}
              className="font-mono text-[9px] tracking-widest text-[#1a3560] opacity-50
                         hover:opacity-80 transition-opacity px-2 py-1 border border-[#1a3560]/20
                         rounded-sm bg-white/50 hover:bg-white/80"
            >
              ⇄ Flip
            </button>
            <span className="font-mono text-[9px] tracking-widest text-[#1a3560] opacity-40 uppercase">
              {flipped ? 'North →' : 'South →'}
            </span>
          </div>

          {/* The corridor */}
          <div className="relative h-[340px]">

            {/* Road line */}
            <div
              className="absolute left-0 right-0 h-[3px] bg-[#1a3560]/20 rounded-full"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />

            {/* Corridor crossing: 5th Ave → 3rd St */}
            <div
              className="absolute top-0 bottom-0 w-px transition-all duration-500"
              style={{ left: `${latToPercent(CORRIDOR_LAT, flipped)}%` }}
            >
              <div className="absolute inset-0 bg-[#c9a060] opacity-30" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-mono text-[8px] text-[#c9a060] tracking-widest bg-[#f5f0e8]/80 px-1.5 py-0.5 rounded-sm">
                  → 3rd St
                </span>
              </div>
            </div>

            {/* Cross-street labels */}
            <div
              className="absolute font-mono text-[8px] tracking-widest text-[#1a3560] opacity-30 uppercase"
              style={{ top: '24px', left: `${latToPercent(26.1415, flipped)}%`, transform: 'translateX(-50%)' }}
            >
              5th Ave S
            </div>
            <div
              className="absolute font-mono text-[8px] tracking-widest text-[#1a3560] opacity-30 uppercase"
              style={{ top: '24px', left: `${latToPercent(26.1388, flipped)}%`, transform: 'translateX(-50%)' }}
            >
              3rd St S
            </div>

            {/* Zone labels */}
            {(() => {
              const crossPct = latToPercent(CORRIDOR_LAT, flipped)
              const fifthCenter = flipped
                ? crossPct + (100 - crossPct) / 2
                : crossPct / 2
              const thirdCenter = flipped
                ? crossPct / 2
                : crossPct + (100 - crossPct) / 2
              return (
                <>
                  <div
                    className="absolute font-mono text-[8px] tracking-widest text-[#1a3560] opacity-30 uppercase transition-all duration-500"
                    style={{ top: '8px', left: `${fifthCenter}%`, transform: 'translateX(-50%)' }}
                  >
                    Fifth Ave
                  </div>
                  <div
                    className="absolute font-mono text-[8px] tracking-widest text-[#1a3560] opacity-30 uppercase transition-all duration-500"
                    style={{ top: '8px', left: `${thirdCenter}%`, transform: 'translateX(-50%)' }}
                  >
                    Third St
                  </div>
                </>
              )
            })()}

            {/* Non-passport layer dots */}
            {visibleShops
              .filter(s => !s.passportType)
              .map(shop => {
                const x = latToPercent(shop.coordinates[1], flipped)
                const layerColor = layers.find(l => l.id === shop.layers[0])?.color || '#999'
                const hash = shop.id.charCodeAt(0) + shop.id.charCodeAt(1)
                const yOffset = (hash % 7) * 18 - 63
                return (
                  <button
                    key={shop.id}
                    onClick={() => setSelectedStop(selectedStop === shop.id ? null : shop.id)}
                    className={`
                      absolute w-3 h-3 rounded-full transition-all duration-200
                      hover:scale-150 hover:z-20
                      ${selectedStop === shop.id ? 'scale-150 z-20 ring-2 ring-white' : 'opacity-50 hover:opacity-90'}
                    `}
                    style={{
                      left: `${x}%`,
                      top: `calc(50% + ${yOffset}px)`,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: layerColor,
                    }}
                    title={shop.name}
                  />
                )
              })}

            {/* Bonus stops */}
            {bonusStops.map(shop => {
              const x = latToPercent(shop.coordinates[1], flipped)
              const stamped = !!stamps[shop.id]
              const hash = shop.id.charCodeAt(2) + shop.id.charCodeAt(3)
              const yOffset = (hash % 5) * 14 - 28
              return (
                <button
                  key={shop.id}
                  onClick={() => setSelectedStop(selectedStop === shop.id ? null : shop.id)}
                  className={`
                    absolute w-4 h-4 rounded-sm transition-all duration-200
                    hover:scale-150 hover:z-20 rotate-45
                    ${selectedStop === shop.id ? 'scale-150 z-20 ring-2 ring-white' : ''}
                    ${stamped ? 'opacity-100' : 'opacity-60 hover:opacity-90'}
                  `}
                  style={{
                    left: `${x}%`,
                    top: `calc(50% + ${yOffset}px)`,
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    backgroundColor: shop.selloColor,
                  }}
                  title={shop.name}
                />
              )
            })}

            {/* Core passport stops */}
            {coreStops.map(shop => {
              const x = latToPercent(shop.coordinates[1], flipped)
              const stamped = !!stamps[shop.id]
              const above = shop.passportStop % 2 === 1
              const yOffset = above ? -40 : 40
              return (
                <button
                  key={shop.id}
                  onClick={() => setSelectedStop(selectedStop === shop.id ? null : shop.id)}
                  className="absolute flex flex-col items-center transition-all duration-200 hover:z-20 group"
                  style={{
                    left: `${x}%`,
                    top: `calc(50% + ${yOffset}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="absolute w-px bg-[#1a3560]/15"
                    style={{
                      height: `${Math.abs(yOffset) - 14}px`,
                      top: above ? '100%' : 'auto',
                      bottom: above ? 'auto' : '100%',
                    }}
                  />

                  <div
                    className={`
                      w-7 h-7 rounded-full flex items-center justify-center
                      text-xs font-mono font-bold transition-all duration-300
                      group-hover:scale-110
                      ${selectedStop === shop.id ? 'scale-110 ring-2 ring-[#c9a060]' : ''}
                      ${stamped ? 'text-white shadow-sm' : 'text-white/70'}
                    `}
                    style={{
                      backgroundColor: stamped ? shop.selloColor : `${shop.selloColor}88`,
                    }}
                  >
                    {stamped ? '✓' : shop.passportStop}
                  </div>

                  <p className={`
                    text-center font-mono text-[9px] text-[#0d1f3c] mt-1 leading-tight w-16 break-words
                    ${stamped ? 'text-[#0d1f3c]' : 'text-[#1a3560] opacity-60'}
                  `}>
                    {shop.name}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-dashed border-[#1a3560]/15">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-[#0d1f3c] flex items-center justify-center">
                <span className="text-white text-[7px] font-mono">1</span>
              </div>
              <span className="font-mono text-[9px] text-[#1a3560] opacity-60">Core stop</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-[#1a3560] rotate-45" />
              <span className="font-mono text-[9px] text-[#1a3560] opacity-60">Bonus</span>
            </div>
          </div>
        </div>
      </div>

      {/* BACKDROP */}
      {selectedStop && selectedShop && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setSelectedStop(null)}
        />
      )}

      {/* BOTTOM SHEET */}
      {selectedStop && selectedShop && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-[#f5f0e8] rounded-t-2xl shadow-[0_-4px_24px_rgba(13,31,60,0.15)] max-w-2xl mx-auto"
            style={{
              borderTopColor: selectedShop.selloColor,
              borderTopWidth: '4px',
              borderTopStyle: 'solid',
            }}
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-[#1a3560]/20" />
            </div>

            <div className="px-6 pb-8 pt-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-mono text-[10px] tracking-widest text-[#1a3560] opacity-50 uppercase mb-1">
                    {selectedShop.layers?.[0]}
                  </p>
                  <h2 className="font-serif text-2xl font-bold text-[#0d1f3c] leading-tight">
                    {selectedShop.name}
                  </h2>
                  <p className="font-mono text-xs text-[#1a3560] opacity-60 mt-1">
                    {selectedShop.address}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStop(null)}
                  className="w-8 h-8 rounded-full bg-[#1a3560]/10 flex items-center
                             justify-center font-mono text-sm text-[#1a3560]
                             hover:bg-[#1a3560]/20 transition-colors flex-shrink-0 mt-1"
                >
                  ×
                </button>
              </div>

              {(() => {
                const todayKey = ['sun','mon','tue','wed','thu','fri','sat'][new Date().getDay()]
                const todayHours = selectedShop.hours?.[todayKey]
                const isClosed = todayHours?.toLowerCase() === 'closed'
                return todayHours ? (
                  <p className="font-mono text-sm mt-3">
                    <span className="text-[#c9a060] font-bold">→ Today: </span>
                    <span className={isClosed ? 'text-[#b5451b]' : 'text-[#0d1f3c]'}>
                      {todayHours}
                    </span>
                  </p>
                ) : null
              })()}

              <div className="flex flex-wrap gap-2 mt-3">
                {selectedShop.layers?.map((layerId: string) => {
                  const layer = layers.find(l => l.id === layerId)
                  return layer ? (
                    <span
                      key={layerId}
                      className="text-[10px] font-mono px-2 py-1 rounded-full text-white"
                      style={{ backgroundColor: layer.color }}
                    >
                      {layer.icon} {layer.label}
                    </span>
                  ) : null
                })}
              </div>

              <div className="flex gap-3 mt-4">
                {selectedShop.passportType === 'core' && (
                  <Link
                    href={`/stop/${selectedShop.id}`}
                    className="flex-1 py-3 bg-[#0d1f3c] text-[#f5f0e8] text-center
                               font-mono text-xs tracking-widest uppercase rounded-sm
                               hover:bg-[#1a3560] transition-colors"
                  >
                    Visit Stop →
                  </Link>
                )}
                {selectedShop.instagram && (
                  <a
                    href={`https://instagram.com/${selectedShop.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 border border-[#1a3560]/30 text-[#1a3560]
                               text-center font-mono text-xs tracking-widest uppercase
                               rounded-sm hover:bg-[#1a3560]/10 transition-colors"
                  >
                    Instagram ↗
                  </a>
                )}
                {selectedShop.placeId && (
                  <a
                    href={`https://www.google.com/maps/place/?q=place_id:${selectedShop.placeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 border border-[#1a3560]/30 text-[#1a3560]
                               text-center font-mono text-xs tracking-widest uppercase
                               rounded-sm hover:bg-[#1a3560]/10 transition-colors"
                  >
                    Directions ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROUTE LIST */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-serif text-lg font-bold text-[#0d1f3c]">
            The Route
          </h2>
          <div className="flex-1 border-t border-dashed border-[#1a3560] opacity-20" />
          <span className="font-mono text-[10px] text-[#1a3560] opacity-50">
            {coreStamped}/10
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {coreStops.map((shop, i) => {
            const stamped = !!stamps[shop.id]
            // Divider between stop 6 and 7 (fifth → third crossing)
            const showDivider = i === 6
            return (
              <div key={shop.id}>
                {showDivider && (
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-[#c9a060] opacity-30" />
                    <span className="font-mono text-[9px] text-[#c9a060] tracking-widest">→ 3rd Street</span>
                    <div className="flex-1 h-px bg-[#c9a060] opacity-30" />
                  </div>
                )}
                <Link
                  href={`/stop/${shop.id}`}
                  className="flex items-center gap-2.5 p-2.5 bg-white/40 border border-[#1a3560]/10
                             rounded-sm hover:bg-white/70 transition-all group"
                >
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center
                               text-white text-[10px] font-mono font-bold flex-shrink-0"
                    style={{ backgroundColor: stamped ? shop.selloColor : `${shop.selloColor}66` }}
                  >
                    {stamped ? '✓' : shop.passportStop}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-serif text-sm truncate ${stamped ? 'font-bold text-[#0d1f3c]' : 'text-[#1a3560]'}`}>
                      {shop.name}
                    </p>
                  </div>
                  <span className="font-mono text-[9px] text-[#1a3560] opacity-30 flex-shrink-0">
                    {shop.address.split(' ').slice(0, 2).join(' ')}
                  </span>
                  <span className="text-[#1a3560] opacity-20 group-hover:opacity-50 transition-all text-sm">
                    →
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* PASSPORT CTA */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <Link
          href="/passport"
          className="block w-full py-4 bg-[#0d1f3c] text-[#f5f0e8] text-center
                     font-mono text-sm tracking-widest uppercase rounded-sm
                     shadow-[3px_3px_0_#c9a060] hover:translate-x-[-1px]
                     hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#c9a060]
                     transition-all"
        >
          View Your Passport
        </Link>
      </div>

      {/* FOOTER */}
      <div className="bg-[#0d1f3c] px-6 py-6 text-center border-t-2 border-[#c9a060]">
        <Link
          href="/"
          className="font-mono text-xs text-[#c9a060] opacity-60
                     hover:opacity-100 transition-opacity tracking-widest uppercase"
        >
          ← Back Home
        </Link>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          60% { transform: translateY(-4px); opacity: 1; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slideUp 0.35s ease-out;
        }
      `}} />

    </main>
  )
}
