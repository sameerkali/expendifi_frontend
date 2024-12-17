"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  dob: z.date().max(new Date(), "Date of birth cannot be in the future"),
  gender: z.enum(["male", "female", "other"]),
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),
  gstNumber: z
    .string()
    .regex(/^\d{7,}$/, "GST number must be at least 7 digits"),
});

type FormData = z.infer<typeof formSchema>;

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });
  const { toast } = useToast();

  const onSubmit = (data: FormData) => {
    console.log(data);
    localStorage.setItem("isAuthenticated", "true");
    router.push("/dashboard");
    toast({
      title: "Form submitted successfully",
      description: "Your information has been received.",
    });
  };

  const nextStep = () => {
    // Define fields to validate based on the current step
    const fieldsToValidate: (keyof FormData)[] =
      step === 1
        ? ["name", "companyName"]
        : step === 2
          ? ["dob", "gender"]
          : [];

    methods.trigger(fieldsToValidate).then((isValid) => {
      if (isValid) {
        setStep(step + 1);
        toast({
          title: "Step completed",
          description: `Moving to step ${step + 1}`,
        });
      } else {
        // Show error toast if validation fails
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields correctly.",
          variant: "destructive",
        });
      }
    });
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      toast({
        title: "Moving back",
        description: `Returning to step ${step - 1}`,
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Multi-Step Form</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo />}
            {step === 3 && <StepThree />}
            <div className="mt-4">
              {Object.entries(methods.formState.errors).map(([key, error]) => (
                <p key={key} className="text-sm text-red-500">
                  {error.message as string}
                </p>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
