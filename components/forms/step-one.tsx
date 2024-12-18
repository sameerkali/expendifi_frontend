import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function StepOne({ userType }: { userType: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      {userType === "individual" && (
        <>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message as string}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500">{errors.email.message as string}</p>
            )}
          </div>
        </>
      )}
      {userType === "company" && (
        <div>
          <Label htmlFor="phoneNumber">Phone Number (Optional)</Label>
          <Input id="phoneNumber" {...register("phoneNumber")} />
        </div>
      )}
    </div>
  );
}
