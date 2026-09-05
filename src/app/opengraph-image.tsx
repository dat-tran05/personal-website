import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = site.name
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Light theme tokens; the OG image is always rendered on paper.
const BG = '#faf6ef'
const ACC = '#b4482b'
const MUTE = '#7a736b'

export default async function OpenGraphImage() {
  const serif = await readFile(join(process.cwd(), 'assets', 'InstrumentSerif-Italic.ttf'))
  const host = new URL(site.url).host

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
          background: BG,
          fontFamily: 'Instrument Serif',
        }}
      >
        <div style={{ fontSize: 400, lineHeight: 1, color: ACC, letterSpacing: -12 }}>DT</div>
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            fontSize: 36,
            color: MUTE,
            fontFamily: 'sans-serif',
          }}
        >
          {host}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Instrument Serif', data: serif, style: 'italic', weight: 400 }],
    },
  )
}
