"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useProtectedRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);
};

export default useProtectedRoute;
