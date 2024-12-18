import MultiStepForm from "@/components/forms/multi-step-form";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <MultiStepForm />
        <Toaster />
      </main>
    </Suspense>
  );
}
