"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [isCompany, setIsCompany] = useState(false); // Toggle for company registration
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear error and redirect to the appropriate multi-step form
    setError("");

    if (isCompany) {
      console.log("Company Registration:", {
        email,
        password,
        confirmPassword,
        companyName,
      });
      router.push("/form?type=company"); // Redirect to company form
    } else {
      console.log("Individual Registration:", { phoneNumber, otp });
      router.push("/form?type=individual"); // Redirect to individual form
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Select your registration type and fill the required fields below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Fields for Individual Registration */}
              {!isCompany && (
                <>
                  {/* Phone Number Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="text"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  {/* OTP Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="otp">OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP (optional)"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Fields for Company Registration */}
              {isCompany && (
                <>
                  {/* Company Name Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="Enter your company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>
                  {/* Email Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {/* Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* Confirm Password Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              {/* Toggle for Company Registration */}
              <div className="grid gap-2">
                <Button
                  type="button"
                  variant={isCompany ? "default" : "outline"}
                  onClick={() => setIsCompany(!isCompany)}
                >
                  {isCompany
                    ? "Switch to Individual Registration"
                    : "Company Registration"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm cursor-pointer">
              Already have an account?{" "}
              <a
                onClick={() => router.push("/login")}
                className="underline underline-offset-4"
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
