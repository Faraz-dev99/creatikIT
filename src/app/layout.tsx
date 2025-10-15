
"use client";

import "./globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./component/Nav";
import { AppSidebar } from "../components/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "../components/ui/separator";
import ProtectedRoute from "./component/ProtectedRoutes";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Check if the current route is /admin
  const isAdminPage = pathname === "/";

  return (
    <html lang="en">
      <body className="min-h-screen bg-background">
        <AuthProvider>
        {isAdminPage ? (
          // 🟢 Admin page — no sidebar or navbar
          <main className="min-h-screen bg-gray-200">{children}</main>
        ) : (
          // 🟣 All other pages — show sidebar and navbar
          <ProtectedRoute>
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
              <header className="flex shrink-0 items-center gap-2 transition-[width] ease-linear bg-gray-950 text-white px-4 shadow-sm">
                <div className="flex items-center gap-2 max-md:hidden">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                </div>

                <div className="ml-auto w-full">
                  <Navbar />
                </div>
              </header>

              <main className="flex flex-1 flex-col gap-4 pt-0">
                <div className="flex items-center absolute top-[70px] left-2 gap-2 max-w-[100px] md:hidden">
                  <SidebarTrigger className="-ml-1" />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                </div>
                <div className="bg-gray-200 max-md:pt-2">{children}</div>
              </main>
            </SidebarInset>
          </SidebarProvider>
          </ProtectedRoute>
        )}
        </AuthProvider>
      </body>
    </html>
  );
}
