"use client";
import './globals.css'
import { ReactNode } from 'react'
import Navbar from './component/Nav'
import { AppSidebar } from '../components/app-sidebar'
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Separator } from '../components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/breadcrump'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <SidebarProvider>
          {/* Sidebar menu */}
          <AppSidebar />

          {/* Main content area */}
          <SidebarInset>
            {/* Header with toggle button and breadcrumb */}
            <header className="flex shrink-0 items-center gap-2 transition-[width] ease-linear bg-gray-950 text-white px-4 shadow-sm">

              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                
              </div>

              {/* Optional: you can place Navbar items on right side */}
              <div className="ml-auto w-full">
                <Navbar />
              </div>
            </header>

            {/* Page content */}
            <main className="flex flex-1 flex-col gap-4 pt-0">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
