import type { ReactNode } from 'react'
import { Karla } from 'next/font/google'
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
      <body>
        <div className="column">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
