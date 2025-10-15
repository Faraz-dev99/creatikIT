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

  if (loading) return null;
  return children;
}
