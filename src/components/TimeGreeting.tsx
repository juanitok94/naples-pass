'use client'

export default function TimeGreeting() {
  const hour = new Date().getHours()
  let text = 'Good evening, Naples.'
  if (hour < 12) text = 'Good morning, Naples.'
  else if (hour < 17) text = 'Good afternoon, Naples.'
  return (
    <p className="text-[#c9a060] text-xs tracking-[0.3em] uppercase mb-2 font-mono">
      {text}
    </p>
  )
}
