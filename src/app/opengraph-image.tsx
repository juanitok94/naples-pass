import { ImageResponse } from 'next/og'

export const alt = 'Naples, Florida — A Walking Guide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d1f3c',
          padding: '80px',
        }}
      >
        {/* Gold top border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#c9a060',
            display: 'flex',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: '18px',
            letterSpacing: '0.3em',
            color: '#c9a060',
            textTransform: 'uppercase',
            marginBottom: '24px',
            opacity: 0.8,
            display: 'flex',
          }}
        >
          A Walking Guide
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '96px',
            fontWeight: 900,
            color: '#f5f0e8',
            lineHeight: 1,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>Naples,</span>
          <span style={{ color: '#c9a060', fontStyle: 'italic', fontSize: '80px' }}>
            Florida
          </span>
        </div>

        {/* Pier silhouette */}
        <div
          style={{
            marginTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '500px',
            opacity: 0.9,
          }}
        >
          <svg
            width="500"
            height="80"
            viewBox="0 0 500 80"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="400" cy="28" r="22" fill="#c9a060" opacity="0.4" />
            <circle cx="400" cy="28" r="14" fill="#c9a060" opacity="0.7" />
            <rect x="20" y="44" width="420" height="4" fill="#c9a060" />
            <rect x="370" y="40" width="70" height="8" fill="#c9a060" />
            <rect x="382" y="26" width="46" height="14" fill="#c9a060" />
            <polygon points="376,26 405,14 434,26" fill="#c9a060" />
            <rect x="22" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="48" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="74" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="100" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="126" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="152" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="178" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="204" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="230" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="256" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="282" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="308" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="334" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="360" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="382" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="404" y="48" width="2" height="24" fill="#c9a060" />
            <rect x="426" y="48" width="2" height="24" fill="#c9a060" />
          </svg>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: '24px',
            color: '#c9a060',
            fontStyle: 'italic',
            marginTop: '32px',
            opacity: 0.7,
            display: 'flex',
          }}
        >
          Ten stops. Two streets. Walk the corridor.
        </div>

        {/* Peachy Kean credit */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            right: '48px',
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

        {/* Gold bottom border */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: '#c9a060',
            opacity: 0.4,
            display: 'flex',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
