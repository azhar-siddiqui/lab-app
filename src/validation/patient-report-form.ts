import z from "zod";

export const reportFormSchema = z.object({
  patientId: z.uuid(),

  reports: z.array(
    z.object({
      testId: z.uuid(),
      testGroupId: z.uuid(),

      result: z.string().min(1, {
        message: "Result required",
      }),
    }),
  ),
});

export type ReportValuesType = z.infer<typeof reportFormSchema>;

export const reportSchema = z.object({
  tests: z.array(
    z.object({
      id: z.uuid(),
      resultValue: z.string().min(1, "Result is required"),
    }),
  ),
});

export type ReportFormValues = z.infer<typeof reportSchema>;
