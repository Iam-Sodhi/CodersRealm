import Helper from '../components/Helper'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'CodersRealm',
  description: 'Your Ultimate Coding Destination. Sharpen your skills, tackle challenges, and connect with a community passionate about code.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <Helper>
      {children}
     </Helper>
    </html>
  )
}
