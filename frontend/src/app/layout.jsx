import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspire',
  description: 'Fitness tracking app to help accomplish your goals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>{children}</body>
      <Toaster />
    </html>
  )
}
