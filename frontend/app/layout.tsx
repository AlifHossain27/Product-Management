import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './Sidebar'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Management System',
  description: 'A Product Management System Built by Alif Hossain Sajib',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <main className='flex'>
          <Sidebar/>
          {children}
          <Toaster />
        </main>
        </AuthProvider>
      </body>
    </html>
  )
}
