import z from "zod";

export const testGroupFormSchema = z.object({
  testGroupName: z
    .string()
    .min(2, { message: "Test group name is required" })
    .trim(),
  shortName: z.string().min(2, { message: "Short name is required" }).trim(),
  category: z.uuid(),
  price: z
    .string({ message: "Price required" })
    .regex(/^\d+(\.\d{1,2})?$/, "Enter valid price (e.g. 100 or 99.99)")
    .trim(),
  isOptionalTestGroupNameOnReport: z.boolean().optional(),
  interpretation: z.string().trim(),
  description: z.string().trim().optional(),
  testRows: z
    .array(
      z
        .object({
          id: z.string().optional(),
          testName: z.string().trim(),
          fullName: z.string().trim().optional(),
          unit: z.string().trim(),
          normalMale: z.string().trim(),
          normalFemale: z.string().trim(),
          optional: z.boolean().optional(),
        })
        .superRefine((row, ctx) => {
          if (row.optional) {
            if (!row.fullName?.trim()) {
              ctx.addIssue({
                code: "custom",
                message: "Full name is required for optional tests",
                path: ["fullName"],
              });
            }
            return;
          }

          if (!row.testName) {
            ctx.addIssue({
              code: "custom",
              message: "Short name is required",
              path: ["testName"],
            });
          }

          if (!row.unit) {
            ctx.addIssue({
              code: "custom",
              message: "Unit is required",
              path: ["unit"],
            });
          }

          if (!row.normalMale) {
            ctx.addIssue({
              code: "custom",
              message: "Enter valid range (e.g. 10-20)",
              path: ["normalMale"],
            });
          }

          if (!row.normalFemale) {
            ctx.addIssue({
              code: "custom",
              message: "Enter valid range (e.g. 10-20)",
              path: ["normalFemale"],
            });
          }
        }),
    )
    .min(1, { message: "At least one test row is required" }),
});

export const unitFromSchema = z.object({
  unit: z.string().min(1, { message: "Unit Required" }),
});

export type TestGroupFormValuesType = z.infer<typeof testGroupFormSchema>;
export type UnitFormValuesType = z.infer<typeof unitFromSchema>;
