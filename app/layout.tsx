"use client"
import './globals.css'
import type { Metadata } from 'next'
import {RecoilRoot} from "recoil";


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

      <RecoilRoot>
      <body >{children}</body>

      </RecoilRoot>
    </html>
  )
}
