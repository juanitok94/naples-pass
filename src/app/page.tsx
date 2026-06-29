import Image from 'next/image'
import Link from 'next/link'
import SaturdayBanner from '@/components/SaturdayBanner'
import RouteFilter from '@/components/RouteFilter'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] text-[#0d1f3c]">

      {/* HEADER */}
      <div className="bg-[#0d1f3c] px-6 py-10 text-center border-b-4 border-[#c9a060]">
        <p className="text-[#c9a060] text-xs tracking-[0.3em] uppercase mb-2 font-mono">
          A WALKING GUIDE
        </p>
        <h1 className="font-serif text-5xl font-black text-[#f5f0e8] leading-none">
          Naples,
        </h1>
        <h2 className="font-serif text-4xl italic text-[#c9a060] leading-none mt-1">
          Florida
        </h2>
        <p className="text-[#c9a060] text-sm italic mt-3 opacity-70 leading-relaxed max-w-xs mx-auto">
          The pier has been rebuilt five times. The sixth is in progress.
          Walk the corridor in the meantime.
        </p>
        <div className="mt-6 max-w-sm mx-auto overflow-hidden rounded-sm">
          <Image
            src="/opengraph-image.jpg"
            alt="Naples, Florida"
            width={1200}
            height={630}
            className="w-full opacity-80"
            priority
          />
        </div>
      </div>

      <SaturdayBanner />

      {/* INTRO */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        <p className="font-serif text-lg leading-relaxed text-[#0d1f3c]">
          Fifth Avenue South and Third Street South are two of the
          finest walkable blocks in Florida. Ten stops: coffee, tea,
          pastries, books, a garden cafe, and a diner on the bay.
          Start on Fifth Avenue. Finish at the Cove Inn on Naples Bay.
        </p>

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
          Naples, FL · Est. 1885 · Ten stops. Two streets.
        </p>
      </div>

      {/* THE ROUTE + DINING — self-contained client component */}
      <RouteFilter />

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
