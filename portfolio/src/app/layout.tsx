import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blake Mulnix - Software Consultant',
  description: `Helping teams build reliable, scalable software solutions. 
  Expertise in GraphQL, cloud architecture, front-end development, 
  deployment pipelines, and more.`,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
