"use client";
import React from "react";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  useProtectedRoute();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
      <Button onClick={handleLogout}>logout</Button>
    </div>
  );
};

export default DashboardPage;
