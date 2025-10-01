"use client";
import './globals.css'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Navbar from './component/Nav'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Sidebar from './component/Sidebar'
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isMenu,setIsMenu]=useState(false);
  const menuRef=useRef<HTMLDivElement>(null);

  useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node)) {
          setIsMenu(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  

  return (
    <html lang="en">
      <body>
          {/* <Sidebar> */}
          <div className=' md:hidden float-right  m-2' onClick={()=>setIsMenu(!isMenu)}>{isMenu?<IoMdClose/>:<FaBars />}</div>
        {isMenu&&<div ref={menuRef} className=' md:hidden'><Navbar /></div>}
        <div className=' max-md:hidden'><Navbar/></div>
        <div>{children}</div>
       {/*  </Sidebar> */}
       
      </body>
    </html>
  )
}
