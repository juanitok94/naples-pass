'use client'

import { useState } from 'react'

interface PhoneModalProps {
  onSave: (phone: string) => void
}

export default function PhoneModal({ onSave }: PhoneModalProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setError('Please enter your phone number.')
      return
    }
    onSave(trimmed)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1a1208]/70">
      <div className="w-full max-w-sm bg-[#f5edd8] rounded-t-2xl sm:rounded-sm p-8 border-t-4 border-[#c8973a]">
        <p className="font-serif text-2xl font-bold text-[#3b1f0a] leading-tight">
          Save your passport
        </p>
        <p className="font-serif text-sm text-[#6b3f1e] mt-2 leading-relaxed">
          Enter your number once. Your stamps will be saved across devices — no app required.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="tel"
            value={value}
            onChange={e => { setValue(e.target.value); setError('') }}
            placeholder="(828) 000-0000"
            autoFocus
            className="w-full px-4 py-3 font-mono text-sm bg-white border-2
                       border-[#6b3f1e]/30 rounded-sm text-[#1a1208]
                       placeholder-[#6b3f1e]/40 focus:outline-none
                       focus:border-[#6b3f1e]"
          />
          {error && (
            <p className="font-mono text-xs text-[#b84c1a] mt-2">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full py-4 bg-[#6b3f1e] text-[#f5edd8]
                       font-mono text-sm tracking-widest uppercase rounded-sm
                       shadow-[3px_3px_0_#3b1f0a] hover:translate-x-[-1px]
                       hover:translate-y-[-1px] hover:shadow-[4px_4px_0_#3b1f0a]
                       active:translate-x-[1px] active:translate-y-[1px]
                       active:shadow-[1px_1px_0_#3b1f0a] transition-all"
          >
            Save My Passport
          </button>
          <p className="font-mono text-[10px] text-[#6b3f1e] opacity-40 mt-4 text-center">
            Your number is only used to save your stamps.
          </p>
        </form>
      </div>
    </div>
  )
}
