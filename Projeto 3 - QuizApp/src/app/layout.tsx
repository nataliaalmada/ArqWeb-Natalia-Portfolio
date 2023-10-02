import Logo from '@/components/Logo/Logo'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { GlobalContextProvider } from '@/context/main'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quiz APP',
  description: 'Vamos ver se tu é da T.I. mesmo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
        <Link href="/">
          <Logo/>
        </Link>
        {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
