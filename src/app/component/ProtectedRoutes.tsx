"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute( {children}:{ children:React.ReactNode } ) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token ="aasdf;lkj" /* localStorage.getItem("token"); */
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return children;
}
