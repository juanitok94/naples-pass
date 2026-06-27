'use client'

export default function SaturdayBanner() {
  const now = new Date()

  // Convert to Eastern Time explicitly
  const eastern = new Date(now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
  }))

  const isSaturday = eastern.getDay() === 6
  const hour = eastern.getHours()
  const minute = eastern.getMinutes()
  const isBeforeClose = hour < 11 || (hour === 11 && minute < 30)

  if (!isSaturday || !isBeforeClose) return null
  return (
    <div className="bg-[#c9a060] text-[#0d1f3c] text-center py-3 px-6">
      <p className="font-mono text-xs tracking-widest uppercase">
        🌿 Third Street Farmers Market is open now · Until 11:30 AM
      </p>
      <p className="font-serif text-sm italic mt-0.5">
        245 13th Ave S · Behind Tommy Bahama · Free to browse
      </p>
    </div>
  )
}
