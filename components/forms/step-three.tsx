import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepThree() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="panNumber">PAN Number</Label>
        <Input id="panNumber" {...register("panNumber")} />
        {errors.panNumber && (
          <p className="text-sm text-red-500">
            {errors.panNumber.message as string}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="gstNumber">GST Number</Label>
        <Input id="gstNumber" {...register("gstNumber")} />
        {errors.gstNumber && (
          <p className="text-sm text-red-500">
            {errors.gstNumber.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
