import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepThree({ userType }: { userType: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      {userType === "individual" && (
        <>
          <div>
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input id="panNumber" {...register("panNumber")} />
            {errors.panNumber && (
              <p className="text-red-500">
                {errors.panNumber.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="aadhaarNumber">Aadhaar Number (Optional)</Label>
            <Input id="aadhaarNumber" {...register("aadhaarNumber")} />
          </div>
        </>
      )}
      {userType === "company" && (
        <>
          <div>
            <Label htmlFor="street">Street</Label>
            <Input id="street" {...register("street")} />
            {errors.street && (
              <p className="text-red-500">{errors.street.message as string}</p>
            )}
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" {...register("city")} />
            {errors.city && (
              <p className="text-red-500">{errors.city.message as string}</p>
            )}
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input id="state" {...register("state")} />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input id="postalCode" {...register("postalCode")} />
          </div>
        </>
      )}
    </div>
  );
}
