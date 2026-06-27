import { ImageResponse } from 'next/og'
import shopsData from '@/data/shops.json'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const shops = shopsData as any[]
  const shop = shops.find(s => s.id === slug)
  return [
    {
      id: 'og',
      alt: shop ? `Stop ${shop.passportStop} — ${shop.name}` : 'Naples, Florida Passport',
    },
  ]
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const shops = shopsData as any[]
  const shop = shops.find(s => s.id === slug)

  const stopNumber = shop?.passportStop ?? ''
  const stopName = shop?.name ?? 'Naples, Florida'
  const stopAddress = shop?.address ?? ''
  const stopZone = shop?.zone ?? ''
  const selloColor = shop?.selloColor ?? '#c9a060'
  const headline = shop?.story?.headline ?? ''

  const zoneLabel: Record<string, string> = {
    design: 'Design District',
    fifth: 'Fifth Avenue South',
    third: 'Third Street South',
    bay: 'Naples Bay',
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0d1f3c',
          padding: '0',
        }}
      >
        {/* Gold top accent bar */}
        <div
          style={{
            height: '6px',
            backgroundColor: '#c9a060',
            display: 'flex',
          }}
        />

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            padding: '60px 72px',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Left: stop number circle */}
          <div
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '50%',
              backgroundColor: selloColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: '72px',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: 'monospace',
              }}
            >
              {stopNumber}
            </span>
          </div>

          {/* Right: stop details */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Zone label */}
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '18px',
                letterSpacing: '0.25em',
                color: '#c9a060',
                textTransform: 'uppercase',
                marginBottom: '16px',
                opacity: 0.7,
                display: 'flex',
              }}
            >
              {zoneLabel[stopZone] ?? stopZone} · Stop {stopNumber} of 10
            </div>

            {/* Stop name */}
            <div
              style={{
                fontSize: stopName.length > 20 ? '56px' : '72px',
                fontWeight: 900,
                color: '#f5f0e8',
                lineHeight: 1.05,
                marginBottom: '20px',
                display: 'flex',
              }}
            >
              {stopName}
            </div>

            {/* Address */}
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '22px',
                color: '#c9a060',
                opacity: 0.6,
                marginBottom: '20px',
                display: 'flex',
              }}
            >
              {stopAddress}
            </div>

            {/* Headline from story */}
            {headline ? (
              <div
                style={{
                  fontFamily: 'serif',
                  fontSize: '26px',
                  fontStyle: 'italic',
                  color: '#f5f0e8',
                  opacity: 0.55,
                  display: 'flex',
                }}
              >
                {headline}
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer bar */}
        <div
          style={{
            height: '72px',
            backgroundColor: '#0a1828',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '72px',
            paddingRight: '72px',
            borderTopWidth: '2px',
            borderTopStyle: 'solid',
            borderTopColor: '#c9a060',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '16px',
              color: '#c9a060',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.7,
              display: 'flex',
            }}
          >
            Naples, Florida — A Walking Guide
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#c9a060',
              opacity: 0.4,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Peachy Kean DevOps
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
