import z from "zod";

export const doctorFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Doctor name must be at least 2 characters.",
    })
    .max(191, "Doctor name must not exceed 191 characters"),
  email: z
    .string()
    .optional()
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
      message: "Invalid email",
    }),
  commission: z
    .string({ message: "Price required" })
    .regex(/^\d+(\.\d{1,2})?$/, "Enter valid price (e.g. 100 or 99.99)")
    .min(0, {
      message: "Commission cannot be negative.",
    })
    .max(100, {
      message: "Commission cannot exceed 100%.",
    }),
  phone: z
    .string()
    .regex(
      /^\+?\d+$/,
      "Phone number must contain only digits and an optional leading '+'",
    )
    .min(
      10,
      "Phone number must be at least 10 characters long (including country code)",
    )
    .max(15, "Phone number must not exceed 15 characters"),
  degree: z.string().min(2, {
    message: "Degree must be at least 2 characters.",
  }),
  // referredById: z.uuid("Invalid referredById").optional(),
});

export type DoctorFormValuesTypes = z.infer<typeof doctorFormSchema>;
