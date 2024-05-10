import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inspire - Fitness Tracker',
  description: 'Fitness tracking app to help accomplish your goals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>{children}
      <footer className='bg-neutral-950 p-4 flex justify-center font-satoshi text-white'>
        <a href='https://www.abejith.dev/' >
          developed by
          <span className=' font-bold ml-2 text-indigo-600'>ABE</span>
        </a>
      </footer>
      <Toaster />
      </body>
      

    </html>
  )
}
