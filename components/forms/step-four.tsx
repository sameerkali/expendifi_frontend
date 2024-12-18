import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function StepFour({ userType }: { userType: string }) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  return (
    <div className="space-y-4">
      {userType === "individual" && (
        <>
          {/* Date of Birth Field */}
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !watch("dob") && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {watch("dob") ? (
                    format(watch("dob"), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={watch("dob")}
                  onSelect={(date) => setValue("dob", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.dob && (
              <p className="text-sm text-red-500">
                {errors.dob.message as string}
              </p>
            )}
          </div>
          {/* Gender Field */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender (Optional)</Label>
            <Select
              onValueChange={(value) => setValue("gender", value)}
              defaultValue={watch("gender") || ""}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-sm text-red-500">
                {errors.gender.message as string}
              </p>
            )}
          </div>
        </>
      )}

      {userType === "company" && (
        <>
          {/* Authorized Person's Name */}
          <div className="space-y-2">
            <Label htmlFor="authorizedName">Authorized Persons Name</Label>
            <Input id="authorizedName" {...register("authorizedName")} />
            {errors.authorizedName && (
              <p className="text-sm text-red-500">
                {errors.authorizedName.message as string}
              </p>
            )}
          </div>
          {/* Designation */}
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input id="designation" {...register("designation")} />
            {errors.designation && (
              <p className="text-sm text-red-500">
                {errors.designation.message as string}
              </p>
            )}
          </div>
          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="authorizedPhone">Phone Number</Label>
            <Input id="authorizedPhone" {...register("authorizedPhone")} />
            {errors.authorizedPhone && (
              <p className="text-sm text-red-500">
                {errors.authorizedPhone.message as string}
              </p>
            )}
          </div>
          {/* Email (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="authorizedEmail">Email (Optional)</Label>
            <Input id="authorizedEmail" {...register("authorizedEmail")} />
            {errors.authorizedEmail && (
              <p className="text-sm text-red-500">
                {errors.authorizedEmail.message as string}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
