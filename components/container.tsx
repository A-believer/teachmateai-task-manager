"use client"
import React from 'react'
import { ThemeProvider } from './theme-provider';
import { Toaster } from './ui/toaster';


export default function Container({
  children, className
}: Readonly<{
  children: React.ReactNode;
  className: string
}>) {
  return (
      
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
      >
        <main className={`${className}`}>
            {children}
        </main>
        <Toaster />
          </ThemeProvider>
   
    
  )
}
