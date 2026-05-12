import z from "zod";

export const testGroupFormSchema = z.object({
  testGroupName: z.string().min(2, { message: "Patient name required" }).trim(),
  shortName: z.string().min(2, { message: "Short name required" }).trim(),
  category: z.uuid(),
  price: z
    .string({ message: "Price required" })
    .regex(/^\d+(\.\d{1,2})?$/, "Enter valid price (e.g. 100 or 99.99)")
    .trim(),
  isOptionalTestGroupNameOnReport: z.boolean().optional(),
  interpretation: z.string().trim(),
  testRows: z
    .array(
      z.object({
        testName: z.string().min(1, { message: "Test name required" }),

        unit: z.string().min(1),

        normalMale: z
          .string()
          .min(1, { message: "Enter valid range (e.g. 10-20)" }),

        normalFemale: z
          .string()
          .min(1, { message: "Enter valid range (e.g. 10-20)" }),

        optional: z.boolean().optional(),
      }),
    )
    .min(1, { message: "At least one test row is required" }),
});

export const unitFromSchema = z.object({
  unit: z.string().min(1, { message: "Unit Required" }),
});

export type TestGroupFormValuesType = z.infer<typeof testGroupFormSchema>;
export type UnitFormValuesType = z.infer<typeof unitFromSchema>;
