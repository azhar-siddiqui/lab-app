import { Age, Designation, Gender } from "@/generated/prisma/enums";
import z from "zod";

export const patientFormSchema = z.object({
  date: z.date(),
  reference: z.uuid(),
  designation: z.enum(Designation),
  patientName: z.string().min(2, { message: "Patient name required" }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{7,14}$/.test(val), {
      message: "Invalid phone number format. Example: +918808808808",
    }),
  gender: z.enum(Gender),
  age: z
    .string({
      message: "Age required",
    })
    .min(1, { message: "Age cannot be negative" }),
  ageType: z.enum(Age),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Invalid email format",
    ),
  address: z.string().optional(),
  testGroupId: z
    .array(
      z.object({
        id: z.uuid({ message: "Please select at least one test" }),
      }),
    )
    .min(1, {
      message: "Please select at least one test",
    }),

  totalRs: z.number(),
  discount: z.number().min(0).max(100),
  ammountRecived: z.number().min(0),
  balance: z.number().min(0),
  remarks: z.string(),
});

export type PatientFormValuesType = z.infer<typeof patientFormSchema>;
