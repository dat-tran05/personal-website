import type { ReactNode } from 'react'
import { Karla } from 'next/font/google'
import { JsonLd } from '@/components/JsonLd/JsonLd'
import { Nav } from '@/components/Nav/Nav'
import { personJsonLd, websiteJsonLd } from '@/lib/jsonld'
import { rootMetadata } from '@/lib/metadata'
import { themeBootScript } from '@/lib/theme'
import '@/styles/globals.css'

export const metadata = rootMetadata

const karla = Karla({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-karla',
  display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={karla.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <JsonLd data={personJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </head>
      <body>
        <div className="column">
          <Nav />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
