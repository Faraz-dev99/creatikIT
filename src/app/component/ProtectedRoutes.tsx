"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function ProtectedRoute( {children}:{ children:React.ReactNode } ) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token =Cookies.get("token"); /* localStorage.getItem("token"); */
    if (!token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null

  return children;
}
