import Link from 'next/link'
import shopsData from '@/data/shops.json'
import TimeGreeting from '@/components/TimeGreeting'
import SaturdayBanner from '@/components/SaturdayBanner'

const shops = shopsData as any[]

const coreStops = shops
  .filter(s => s.passportType === 'core')
  .sort((a, b) => a.passportStop - b.passportStop)

const hyggeStops = shops.filter(s => s.hygge === true)

const fifthStops = coreStops.filter(s => s.zone === 'design' || s.zone === 'fifth')
const thirdStops = coreStops.filter(s => s.zone === 'third' || s.zone === 'bay')

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#0d1f3c]">

      {/* HEADER */}
      <div className="bg-[#0d1f3c] px-6 py-10 text-center border-b-4 border-[#c9a060]">
        <TimeGreeting />
        <h1 className="font-serif text-5xl font-black text-[#f5f0e8] leading-none">
          Naples,
        </h1>
        <h2 className="font-serif text-4xl italic text-[#c9a060] leading-none mt-1">
          Florida
        </h2>
        <p className="text-[#c9a060] text-sm italic mt-3 opacity-70 leading-relaxed max-w-xs mx-auto">
          Naples without the pier wouldn&apos;t be Naples.
          The sixth rebuild is in progress.
          We&apos;ll walk the corridor in the meantime.
        </p>
        <div className="mt-6 max-w-sm mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid meet" className="w-full">
            <circle cx="320" cy="36" r="22" fill="#c9a060" opacity="0.4"/>
            <circle cx="320" cy="36" r="14" fill="#c9a060" opacity="0.6"/>
            <g fill="#c9a060">
              <rect x="20" y="56" width="320" height="3"/>
              <g>
                <rect x="285" y="52" width="50" height="7"/>
                <rect x="295" y="38" width="30" height="14"/>
                <polygon points="291,38 310,28 329,38"/>
              </g>
              <g>
                <rect x="22" y="59" width="1.5" height="22"/>
                <rect x="46" y="59" width="1.5" height="22"/>
                <rect x="70" y="59" width="1.5" height="22"/>
                <rect x="94" y="59" width="1.5" height="22"/>
                <rect x="118" y="59" width="1.5" height="22"/>
                <rect x="142" y="59" width="1.5" height="22"/>
                <rect x="166" y="59" width="1.5" height="22"/>
                <rect x="190" y="59" width="1.5" height="22"/>
                <rect x="214" y="59" width="1.5" height="22"/>
                <rect x="238" y="59" width="1.5" height="22"/>
                <rect x="262" y="59" width="1.5" height="22"/>
                <rect x="281" y="59" width="1.5" height="22"/>
                <rect x="295" y="59" width="1.5" height="22"/>
                <rect x="311" y="59" width="1.5" height="22"/>
                <rect x="327" y="59" width="1.5" height="22"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <SaturdayBanner />

      {/* INTRO */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <p className="font-serif text-lg leading-relaxed text-[#0d1f3c]">
          Fifth Avenue South and Third Street South are two of the
          finest walkable blocks in Florida. Between them: ten stops
          worth finding — coffee, tea, pastries, books, a garden
          cafe, and a diner on the bay.
        </p>
        <p className="font-serif text-lg leading-relaxed text-[#0d1f3c] mt-4">
          Start in the Design District. Weave south between the two streets.
          Finish at the Cove Inn on Naples Bay. The pier is five minutes west —
          currently being rebuilt for the sixth time since 1888. Walk to the
          13th Avenue South beach end to see the progress. The sunset still shows up.
        </p>

        {/* CTA */}
        <Link
          href="/passport"
          className="block w-full mt-8 py-4 bg-[#0d1f3c] text-[#f5f0e8] text-center
                     font-mono text-sm tracking-widest uppercase rounded-sm
                     shadow-[3px_3px_0_#c9a060] hover:translate-x-[-1px]
                     hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#c9a060]
                     transition-all"
        >
          Start Your Passport
        </Link>

        <Link
          href="/map"
          className="block w-full mt-3 py-4 border border-[#0d1f3c] text-[#0d1f3c]
                     text-center font-mono text-sm tracking-widest uppercase rounded-sm
                     hover:bg-[#0d1f3c] hover:text-[#f5f0e8] transition-all"
        >
          Explore the Map
        </Link>

        <p className="font-mono text-[10px] tracking-widest text-[#1a3560] opacity-40
                      uppercase text-center mt-8">
          Naples, FL · Est. 1885 · The pier has been rebuilt five times.
          The sixth is underway.
        </p>
      </div>

      {/* THE ROUTE */}
      <div className="max-w-2xl mx-auto px-6 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="font-serif text-2xl font-bold text-[#0d1f3c]">The Route</h3>
          <div className="flex-1 border-t border-dashed border-[#1a3560] opacity-30" />
        </div>

        {/* Fifth Avenue stops */}
        <p className="font-mono text-[11px] tracking-widest text-[#1a3560] opacity-80 uppercase mb-4 border-l-2 border-[#c9a060]/40 pl-3">
          Design District + Fifth Avenue
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {fifthStops.map(shop => (
            <Link
              key={shop.id}
              href={`/stop/${shop.id}`}
              className="flex items-center gap-3 p-4 bg-white/70 border border-[#1a3560]/20
                         rounded-sm hover:bg-white/80 hover:-translate-y-0.5
                         shadow-[0_2px_8px_rgba(13,31,60,0.08)]
                         hover:shadow-[0_4px_16px_rgba(13,31,60,0.14)]
                         transition-all duration-200 group"
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center
                           text-white text-xs font-mono font-bold flex-shrink-0"
                style={{ backgroundColor: shop.selloColor }}
              >
                {shop.passportStop}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-bold text-[#0d1f3c] text-base truncate">
                  {shop.name}
                </p>
                <p className="font-mono text-[11px] text-[#1a3560] opacity-80">
                  {shop.address}
                </p>
              </div>
              <span className="text-[#1a3560] text-lg opacity-40 group-hover:opacity-70 transition-all">
                ›
              </span>
            </Link>
          ))}
        </div>

        {/* Third Street stops */}
        <p className="font-mono text-[11px] tracking-widest text-[#1a3560] opacity-80 uppercase mb-4 border-l-2 border-[#c9a060]/40 pl-3">
          Third Street + Naples Bay
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {thirdStops.map(shop => (
            <Link
              key={shop.id}
              href={`/stop/${shop.id}`}
              className="flex items-center gap-3 p-4 bg-white/70 border border-[#1a3560]/20
                         rounded-sm hover:bg-white/80 hover:-translate-y-0.5
                         shadow-[0_2px_8px_rgba(13,31,60,0.08)]
                         hover:shadow-[0_4px_16px_rgba(13,31,60,0.14)]
                         transition-all duration-200 group"
            >
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center
                           text-white text-xs font-mono font-bold flex-shrink-0"
                style={{ backgroundColor: shop.selloColor }}
              >
                {shop.passportStop}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-serif font-bold text-[#0d1f3c] text-base truncate">
                  {shop.name}
                </p>
                <p className="font-mono text-[11px] text-[#1a3560] opacity-80">
                  {shop.address}
                </p>
              </div>
              <span className="text-[#1a3560] text-lg opacity-40 group-hover:opacity-70 transition-all">
                ›
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* HYGGE COLLECTION */}
      <div className="max-w-2xl mx-auto px-6 pb-10">
        <div className="mt-6 p-6 bg-white/60 backdrop-blur-sm border border-[#1a3560]/30 rounded-sm
                        shadow-[0_2px_12px_rgba(13,31,60,0.10)]">
          <p className="font-mono text-[10px] tracking-widest text-[#0d4a6b] uppercase mb-1">
            🕯 Hidden Collection
          </p>
          <p className="font-serif text-lg font-bold text-[#0d1f3c]">
            The Quiet Six
          </p>
          <p className="font-serif italic text-sm text-[#1a3560] mt-1 leading-relaxed">
            Five stops where Old Naples slows all the way down.
            Find all six.
          </p>
          <div className="flex flex-wrap mt-3" style={{ gap: '0.5rem' }}>
            {hyggeStops.map(shop => (
              <Link
                key={shop.id}
                href={`/stop/${shop.id}`}
                className="inline-block text-xs font-mono px-2 py-1 rounded-sm
                           text-white opacity-80 hover:opacity-100 transition-opacity"
                style={{ backgroundColor: shop.selloColor }}
              >
                {shop.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#0d1f3c] px-6 py-8 text-center border-t-2 border-[#c9a060]">
        <p className="font-serif italic text-[#c9a060] text-sm opacity-70 leading-relaxed">
          Ten stops. Two streets. End at the pier.
          <br />
          These aren&apos;t tourist traps — they&apos;re what Naples actually is.
        </p>
        <div className="mt-6 pt-6 border-t border-[#c9a060]/20 max-w-md mx-auto">
          <p className="font-mono text-[10px] tracking-widest text-[#c9a060] opacity-60 uppercase">
            Built by Peachy Kean DevOps
          </p>
          <p className="font-serif italic text-[#c9a060] text-xs opacity-60 mt-1">
            West Asheville, NC
          </p>
          <p className="font-serif italic text-[#c9a060] text-xs opacity-60 mt-1">
            Simple tools for the shops and streets worth walking.
          </p>
          <a
            href="mailto:john@peachykeandev.com"
            className="inline-block font-mono text-[11px] text-[#c9a060] opacity-80 hover:opacity-100 mt-3 underline underline-offset-4"
          >
            john@peachykeandev.com
          </a>
        </div>
        <p className="font-mono text-[10px] text-[#c9a060] opacity-40 tracking-widest mt-6">
          #NaplesFlorida · #NaplesPier
        </p>
      </div>

    </main>
  )
}
