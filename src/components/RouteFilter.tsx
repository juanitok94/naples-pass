'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Shop = {
  id: string
  name: string
  address: string
  zone: string
  passportStop?: number | null
  selloColor?: string
  mealtime?: string[]
  story?: { insiderTip?: string }
}

const PILLS = [
  { id: 'morning', label: 'Morning', icon: '☀️' },
  { id: 'lunch',   label: 'Lunch',   icon: '🍽' },
  { id: 'dinner',  label: 'Dinner',  icon: '🌙' },
  { id: 'dessert', label: 'Dessert', icon: '🍦' },
]

export default function RouteFilter({
  coreStops,
  directoryStops,
}: {
  coreStops: Shop[]
  directoryStops: Shop[]
}) {
  const [activeFilter, setActiveFilter] = useState<string>('morning')

  useEffect(() => {
    if (new Date().getHours() >= 18) setActiveFilter('dinner')
  }, [])

  const filteredCore = coreStops.filter(s => s.mealtime?.includes(activeFilter))
  const showDining = ['lunch', 'dinner', 'dessert'].includes(activeFilter)
  const filteredDirectory = showDining
    ? directoryStops.filter(s => s.mealtime?.includes(activeFilter))
    : []

  const fifthStops = filteredCore.filter(s => s.zone === 'fifth')
  const thirdStops = filteredCore.filter(s => s.zone === 'third' || s.zone === 'bay')

  const stopCard = (shop: Shop, linked = true) => {
    const inner = (
      <>
        <span
          className="w-9 h-9 rounded-full flex items-center justify-center
                     text-white text-xs font-mono font-bold flex-shrink-0"
          style={{ backgroundColor: shop.selloColor || '#1a3560' }}
        >
          {shop.passportStop ?? '✦'}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-serif font-bold text-[#0d1f3c] text-base truncate">{shop.name}</p>
          <p className="font-mono text-[11px] text-[#1a3560] opacity-80">{shop.address}</p>
          {!linked && shop.story?.insiderTip && (
            <p className="font-serif italic text-xs text-[#1a3560] opacity-60 mt-1 leading-relaxed line-clamp-2">
              {shop.story.insiderTip}
            </p>
          )}
        </div>
        {linked && (
          <span className="text-[#1a3560] text-lg opacity-40 group-hover:opacity-70 transition-all">›</span>
        )}
      </>
    )

    const cls = `flex items-start gap-3 p-4 bg-white/70 border border-[#1a3560]/20
                 rounded-sm shadow-[0_2px_8px_rgba(13,31,60,0.08)] transition-all duration-200`

    return linked ? (
      <Link
        key={shop.id}
        href={`/stop/${shop.id}`}
        className={`${cls} hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(13,31,60,0.14)] group`}
      >
        {inner}
      </Link>
    ) : (
      <div key={shop.id} className={cls}>
        {inner}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 pb-6">
      <div className="flex items-center gap-3 mb-5">
        <h3 className="font-serif text-2xl font-bold text-[#0d1f3c]">The Route</h3>
        <div className="flex-1 border-t border-dashed border-[#1a3560] opacity-30" />
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PILLS.map(pill => {
          const active = activeFilter === pill.id
          return (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono
                transition-all border
                ${active
                  ? 'bg-[#0d1f3c] text-[#c9a060] border-[#0d1f3c]'
                  : 'bg-transparent border-[#1a3560]/20 text-[#1a3560] opacity-50 hover:opacity-80'
                }
              `}
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </button>
          )
        })}
      </div>

      {/* Fifth Ave stops */}
      {fifthStops.length > 0 && (
        <>
          <p className="font-mono text-[11px] tracking-widest text-[#1a3560] opacity-80 uppercase mb-4 border-l-2 border-[#c9a060]/40 pl-3">
            Fifth Avenue
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {fifthStops.map(s => stopCard(s, true))}
          </div>
        </>
      )}

      {/* Third St + Bay stops */}
      {thirdStops.length > 0 && (
        <>
          <p className="font-mono text-[11px] tracking-widest text-[#1a3560] opacity-80 uppercase mb-4 border-l-2 border-[#c9a060]/40 pl-3">
            Third Street + Naples Bay
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {thirdStops.map(s => stopCard(s, true))}
          </div>
        </>
      )}

      {/* Empty core state — dinner/dessert filters have no core stops */}
      {filteredCore.length === 0 && (
        <p className="font-serif italic text-[#1a3560] opacity-60 text-sm py-2">
          The passport stops are morning and lunch spots.
        </p>
      )}

      {/* Dining section — visible when Lunch / Dinner / Dessert is active */}
      {showDining && filteredDirectory.length > 0 && (
        <div className="mt-6">
          <p className="font-mono text-[11px] tracking-widest text-[#1a3560] opacity-80 uppercase mb-4 border-l-2 border-[#c9a060]/40 pl-3">
            Dining
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDirectory.map(s => stopCard(s, false))}
          </div>
        </div>
      )}
    </div>
  )
}
