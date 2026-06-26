import { useState, useEffect } from 'react'

const COOKIE_NAME = 'hh_phone'
const MAX_AGE = 365 * 24 * 3600

export function getPhoneCookie(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)hh_phone=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function setPhoneCookie(phone: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(phone)}; max-age=${MAX_AGE}; path=/; SameSite=Lax`
}

export function usePhone() {
  const [phone, setPhoneState] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setPhoneState(getPhoneCookie())
    setLoaded(true)
  }, [])

  function savePhone(value: string) {
    setPhoneCookie(value)
    setPhoneState(value)
  }

  return { phone, savePhone, loaded }
}
