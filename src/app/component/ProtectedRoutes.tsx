"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!admin) {
      router.push("/"); // redirect if not logged in
    } else {
      setLoading(false);
    }
  }, [admin, router]);

  if (loading) return <div className=" grid place-items-center min-h-[calc(100vh-0px)] w-full text-lg text-gray-600">Loading page..</div>;
  return children;
}
