import React from 'react'
import Logo from './logo'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
  return (
    <div className="flex items-center justify-between lg:p-9 sm:p-7 p-5">
        <Logo/>
        <ModeToggle/>
      </div>
  )
}
