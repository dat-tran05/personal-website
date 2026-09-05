import type { ReactNode } from 'react'
import { Karla } from 'next/font/google'
import { themeBootScript } from '@/lib/theme'
import { Nav } from '@/components/Nav/Nav'
import '@/styles/globals.css'

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
