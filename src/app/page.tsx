"use client";
import Dashboard from "./dashboard/page";
import Navbar from "./component/Nav";
import Layout from "./layout";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "./component/ProtectedRoutes";
import Admin from "./admin/page"

// app/page.tsx
export default function Page() {
    
  return <div>
     <Admin />
   </div>
}

