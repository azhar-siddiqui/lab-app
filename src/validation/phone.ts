import z from "zod";

const E164_PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

export function isValidE164PhoneNumber(
  value: string | undefined | null,
): value is string {
  return typeof value === "string" && E164_PHONE_REGEX.test(value);
}

export const phoneNumberSchema = z
  .string()
  .min(1, "Mobile number is required.")
  .refine(isValidE164PhoneNumber, {
    message: "Enter a valid mobile number.",
  });