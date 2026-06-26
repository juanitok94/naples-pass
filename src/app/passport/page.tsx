// /src/app/passport/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import shopsData from '@/data/shops.json'
import badgesData from '@/data/badges.json'
import { getStamps, type StampRecord } from '@/lib/stamps'
import { usePhone } from '@/lib/usePhone'
import { getProgress } from '@/lib/passportApi'

const shops = shopsData as any[]
const badges = badgesData as any[]

const coreStops = shops
  .filter(s => s.passportType === 'core')
  .sort((a, b) => a.passportStop - b.passportStop)

const fifthStops = coreStops.filter(s => s.zone === 'design' || s.zone === 'fifth')
const thirdStops = coreStops.filter(s => s.zone === 'third' || s.zone === 'bay')

export default function PassportPage() {
  const { phone, loaded: phoneLoaded } = usePhone()
  const [stamps, setStamps] = useState<StampRecord>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!phoneLoaded) return
    const localStamps = getStamps()

    if (phone) {
      getProgress(phone).then(slugs => {
        const merged: StampRecord = { ...localStamps }
        for (const s of slugs) {
          if (!merged[s]) merged[s] = new Date().toISOString()
        }
        setStamps(merged)
        setMounted(true)
      })
    } else {
      setStamps(localStamps)
      setMounted(true)
    }
  }, [phone, phoneLoaded])

  useEffect(() => {
    if (!phoneLoaded) return
    const sync = () => {
      const localStamps = getStamps()
      if (phone) {
        getProgress(phone).then(slugs => {
          const merged: StampRecord = { ...localStamps }
          for (const s of slugs) {
            if (!merged[s]) merged[s] = new Date().toISOString()
          }
          setStamps(merged)
        })
      } else {
        setStamps(localStamps)
      }
    }
    window.addEventListener('focus', sync)
    return () => window.removeEventListener('focus', sync)
  }, [phone, phoneLoaded])

  const coreStamped = coreStops.filter(s => stamps[s.id]).length
  const progress = Math.round((coreStamped / 10) * 100)

  const earnedBadges = badges.filter(
    b => b.type === 'core' && coreStamped >= b.threshold
  )

  const nextBadge = badges
    .filter(b => b.type === 'core' && coreStamped < b.threshold)
    .sort((a, b) => a.threshold - b.threshold)[0]

  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#0d1f3c]">

      {/* HEADER */}
      <div className="bg-[#0d1f3c] px-6 py-8 text-center border-b-4 border-[#c9a060]">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-widest text-[#c9a060] opacity-60
                     hover:opacity-100 transition-opacity uppercase"
        >
          ← Old Naples Passport
        </Link>
        <h1 className="font-serif text-3xl font-black text-[#f5f0e8] mt-3">
          Your Passport
        </h1>
        <p className="text-[#c9a060] text-sm italic mt-1 opacity-70">
          {coreStamped === 0 && 'No stamps yet. Time to walk.'}
          {coreStamped > 0 && coreStamped < 10 &&
            `${coreStamped} of 10 stamps collected`}
          {coreStamped === 10 && 'All stamps collected. Walk to the pier.'}
        </p>
      </div>

      {/* PROGRESS BAR */}
      <div className="max-w-lg mx-auto px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] tracking-widest text-[#1a3560] uppercase">
            Progress
          </span>
          <span className="font-mono text-xs text-[#1a3560] font-bold">
            {coreStamped}/10
          </span>
        </div>
        <div className="w-full h-3 bg-[#e8e2d4] rounded-full overflow-hidden border border-[#1a3560]/20">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: mounted ? `${progress}%` : '0%',
              backgroundColor: coreStamped === 10 ? '#c9a060' : '#0d1f3c',
            }}
          />
        </div>
      </div>

      {/* EARNED BADGES */}
      {earnedBadges.length > 0 && (
        <div className="max-w-lg mx-auto px-6 pt-5">
          <div className="flex flex-wrap gap-2">
            {earnedBadges.map(b => (
              <div
                key={b.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-white text-xs font-mono"
                style={{ backgroundColor: b.color }}
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NEXT BADGE HINT */}
      {nextBadge && (
        <div className="max-w-lg mx-auto px-6 pt-3">
          <p className="font-serif text-sm italic text-[#1a3560] opacity-70">
            {nextBadge.threshold - coreStamped} more stamp{nextBadge.threshold - coreStamped !== 1 ? 's' : ''} to earn &ldquo;{nextBadge.label}&rdquo;
          </p>
        </div>
      )}

      {/* STAMP GRID */}
      <div className="max-w-lg mx-auto px-6 py-6">

        {/* Fifth Avenue section */}
        <div className="flex items-center gap-3 mb-4">
          <p className="font-mono text-[10px] tracking-widest text-[#1a3560] opacity-60 uppercase whitespace-nowrap">
            Design District + Fifth Ave
          </p>
          <div className="flex-1 border-t border-dashed border-[#1a3560] opacity-30" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {fifthStops.map(shop => (
            <StampCard
              key={shop.id}
              shop={shop}
              stamped={!!stamps[shop.id]}
              stampDate={stamps[shop.id]}
              mounted={mounted}
            />
          ))}
        </div>

        {/* Corridor crossing divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#c9a060] opacity-40" />
          <span className="font-mono text-[10px] text-[#c9a060] tracking-widest px-2">
            → 3rd Street
          </span>
          <div className="flex-1 h-px bg-[#c9a060] opacity-40" />
        </div>

        {/* Third Street section */}
        <div className="flex items-center gap-3 mb-4">
          <p className="font-mono text-[10px] tracking-widest text-[#1a3560] opacity-60 uppercase whitespace-nowrap">
            Third Street + Naples Bay
          </p>
          <div className="flex-1 border-t border-dashed border-[#1a3560] opacity-30" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {thirdStops.map(shop => (
            <StampCard
              key={shop.id}
              shop={shop}
              stamped={!!stamps[shop.id]}
              stampDate={stamps[shop.id]}
              mounted={mounted}
            />
          ))}
        </div>
      </div>

      {/* COMPOSTELA — 10/10 completion */}
      {coreStamped === 10 && (
        <div className="max-w-lg mx-auto px-6 pb-8">
          <div className="p-6 bg-[#0d1f3c] border-2 border-[#c9a060] rounded-sm text-center">
            <p className="text-3xl mb-2">⚓</p>
            <p className="font-serif text-xl font-bold text-[#c9a060]">
              Old Naples Passport
            </p>
            <p className="font-serif italic text-sm text-[#f5f0e8] mt-2 leading-relaxed">
              You walked the corridor. Design District to the bay,
              weaving between Fifth and Third, stop by stop.
              Now walk to the end of the pier.
              You&apos;ve earned the sunset.
            </p>
            <p className="font-mono text-[10px] text-[#c9a060] opacity-50 mt-4 tracking-widest">
              #OldNaplesPassport · #NaplesPier
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="bg-[#0d1f3c] px-6 py-8 text-center border-t-2 border-[#c9a060]">
        <Link
          href="/"
          className="font-mono text-xs text-[#c9a060] opacity-60
                     hover:opacity-100 transition-opacity tracking-widest uppercase"
        >
          ← Back Home
        </Link>
        <p className="font-serif italic text-[#f5f0e8] text-sm opacity-50 mt-4 leading-relaxed">
          Stamps are saved on this device.
          <br />
          No account needed. No data leaves your phone.
        </p>
      </div>

    </main>
  )
}


/* ─── Stamp Card Component ─── */

function StampCard({
  shop,
  stamped,
  stampDate,
  mounted,
}: {
  shop: any
  stamped: boolean
  stampDate?: string
  mounted: boolean
}) {
  const formattedDate = stampDate
    ? new Date(stampDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/stop/${shop.id}`}
      className={`
        relative flex flex-col items-center justify-center p-4 rounded-sm
        border text-center transition-all min-h-[140px] group
        ${stamped
          ? 'bg-white/80 border-[#1a3560]/30 shadow-sm'
          : 'bg-white/30 border-dashed border-[#1a3560]/20 hover:bg-white/50'
        }
      `}
    >
      <span className="absolute top-2 left-2 font-mono text-[10px] text-[#1a3560] opacity-40">
        #{shop.passportStop}
      </span>

      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center
          transition-all duration-500 mb-2
          ${stamped ? 'scale-100 opacity-100' : 'scale-75 opacity-20'}
        `}
        style={{
          backgroundColor: stamped ? shop.selloColor : '#d4cfc5',
          border: stamped ? `2px solid ${shop.selloColor}` : '2px dashed #1a356040',
        }}
      >
        {stamped ? (
          <span className="text-white text-lg">✓</span>
        ) : (
          <span className="text-[#1a3560] opacity-30 text-lg">?</span>
        )}
      </div>

      <p className={`
        font-serif text-xs font-bold leading-tight
        ${stamped ? 'text-[#0d1f3c]' : 'text-[#1a3560] opacity-50'}
      `}>
        {shop.name}
      </p>

      <p className="font-mono text-[9px] mt-1 text-[#1a3560] opacity-50">
        {stamped ? formattedDate : 'Tap to visit →'}
      </p>
    </Link>
  )
}
