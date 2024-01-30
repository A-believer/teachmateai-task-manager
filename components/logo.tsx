import React from 'react'
import logo from "../public/Logo.png"
import Image from "next/image";

export default function Logo() {
  return (
      <div className="text-2xl flex items-center gap-x-2">
          <Image src={logo} alt="logo" className="backdrop-blur-none backdrop-filter-none w-10 h-12" />
          <p className='pb-2 tracking-tighter font-bold'>TeachmateAI</p>
      </div>
  )
}
