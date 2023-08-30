"use client"
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

export default function Helper({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <RecoilRoot>
    <body >
     
       {children}
       <Toaster  position='top-right'/>
       </body>
       </RecoilRoot>
  )
}
