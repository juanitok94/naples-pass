const API_BASE = 'https://brew-loyalty-mvp.vercel.app'

export type CheckinResult =
  | { ok: true; shops_visited: number }
  | { ok: false; notInPassport: true }
  | { ok: false; unreachable: true }

export async function checkin(phone: string, shop_slug: string): Promise<CheckinResult> {
  try {
    const res = await fetch(`${API_BASE}/api/passport/checkin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, shop_slug }),
    })
    if (res.status === 404) return { ok: false, notInPassport: true }
    if (!res.ok) return { ok: false, unreachable: true }
    const data = await res.json()
    return { ok: true, shops_visited: data.shops_visited }
  } catch {
    return { ok: false, unreachable: true }
  }
}

export async function getProgress(phone: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${API_BASE}/api/passport/progress?phone=${encodeURIComponent(phone)}`
    )
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.visited_slugs) ? data.visited_slugs : []
  } catch {
    return []
  }
}
