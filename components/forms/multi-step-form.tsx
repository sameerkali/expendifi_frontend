"use client";

import { ReactNode, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";
import StepFour from "./step-four";
import { useSearchParams } from "next/navigation";

// Validation schemas
const individualSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  street: z.string().min(2, "Street is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN"),
  aadhaarNumber: z.string().optional(),
  dob: z.date().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
});

const companySchema = z.object({
  phoneNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN"),
  street: z.string().min(2, "Street is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  branchAddress: z.string().optional(),
  authorizedName: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string(),
  authorizedPhone: z.string(),
  authorizedEmail: z.string().email("Invalid email").optional(),
});

export default function MultiStepForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const userType = searchParams.get("type") || "individual"; // "individual" or "company"
  const { toast } = useToast();

  // Step names based on user type
  const steps =
    userType === "individual"
      ? ["Details", "Address", "Documentation", "Other"]
      : ["Number", "Documents", "Address", "Handler Details"];

  const methods = useForm({
    resolver: zodResolver(
      userType === "individual" ? individualSchema : companySchema,
    ),
    mode: "onSubmit",
  });

  const validateCurrentStep = async () => {
    const currentFields =
      userType === "individual"
        ? step === 1
          ? ["name", "email"]
          : step === 2
            ? ["street", "city", "state", "postalCode"]
            : step === 3
              ? ["panNumber", "aadhaarNumber"]
              : ["dob", "gender"]
        : step === 1
          ? ["phoneNumber"]
          : step === 2
            ? ["gstNumber", "panNumber"]
            : step === 3
              ? ["street", "city", "state", "postalCode"]
              : [
                  "authorizedName",
                  "designation",
                  "authorizedPhone",
                  "authorizedEmail",
                ];

    const isValid = await methods.trigger(currentFields);

    if (!isValid) {
      const errors = currentFields
        .map((field) => methods.formState.errors[field])
        .filter((error) => error);

      errors.forEach((error) => {
        toast({
          title: "Validation Error",
          description: (error?.message as ReactNode) || "Invalid input",
          variant: "destructive",
        });
      });
    }

    return isValid;
  };

  const nextStep = async () => {
    const totalSteps = userType === "individual" ? 4 : 4;
    const isValid = await validateCurrentStep();

    if (isValid && step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: any) => {
    const isValid = await validateCurrentStep();

    if (isValid && step === 4) {
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Dynamic Stepper */}
        <ul className="steps mb-8">
          {steps.map((stepName, index) => (
            <li
              key={stepName}
              className={`step ${index + 1 <= step ? "step-primary" : ""}`}
            >
              {stepName}
            </li>
          ))}
        </ul>

        <Card className="w-[400px] mx-auto">
          <CardHeader>
            <CardTitle>{steps[step - 1]}</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && <StepOne userType={userType} />}
            {step === 2 && <StepTwo userType={userType} />}
            {step === 3 && <StepThree userType={userType} />}
            {step === 4 && <StepFour userType={userType} />}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" type="button" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : null}
            {step === 4 && (
              <div className="mt-4 flex justify-center">
                <Button type="submit" className="bg-green-500 text-white">
                  Submit
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
