'use client'
import { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { CiLogout } from 'react-icons/ci'
import Link from 'next/link'
import { SidebarData } from '../data/SidebarData'

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700) // breakpoint at 700px
      if (window.innerWidth <= 700) setIsOpen(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div
        className={`
          bg-zinc-800 text-gray-100 transition-all duration-300
        `}
      >
        <div className="flex flex-col justify-between p-4 border-b border-gray-800">
          {/* {(!isMobile || isOpen) && <h1 className="text-lg font-bold">Dashboard</h1>} */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-stone-900 rounded"
          >
            <FaBars />
          </button>

          {
            !isOpen&&<div className=' flex flex-col gap-[20px] items-center text-xl mt-[30px]'>
            {
              SidebarData.map((item,index)=>{
                return <Link href={item.path}>{item.icon}</Link>
              })
            }
          </div>
          }
          
          
        </div>

        {/* Menu Items */}
        {isOpen && (
          <nav className="flex flex-col">

            {
              SidebarData.map((item, index) => {
                return <Link href={item.path}>
              <div className="flex items-center gap-2 p-4 hover:bg-stone-900 cursor-pointer">
                <span>{item.icon}</span>
                {!isMobile && <span>{item.title}</span>}
              </div>
            </Link>
            })}
            
            
            <div className="flex items-center gap-2 p-4 hover:bg-gray-800 cursor-pointer mt-auto">
              <CiLogout />
              {!isMobile && <span>Logout</span>}
            </div>
          </nav>
        )}
      </div>

      {/* Page Content */}
      <div
        className={`
          flex-1 transition-all duration-300
          
        `}
      >
        {children}
      </div>
    </div>
  )
}
