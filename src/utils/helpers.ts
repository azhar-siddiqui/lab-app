import crypto from "node:crypto";

/**
 * Generates a deterministic, visually balanced array of bar widths tied securely to a specific input ID.
 * This completely eliminates SSR hydration errors.
 */
export function generateDeterministicBarcodePattern(
  id: string,
  length: number = 34,
): number[] {
  const pattern: number[] = [];

  // Create a secure SHA-256 hash string from the patient ID
  const hash = crypto.createHash("sha256").update(id).digest();

  for (let i = 0; i < length; i++) {
    // Loop through the hash bytes (wrapping around if length > 32 bytes)
    const byteValue = hash[i % hash.length];
    const secureValue = byteValue / 255;

    let selectedWidth = 1;
    if (secureValue > 0.85) {
      selectedWidth = 4;
    } else if (secureValue > 0.65) {
      selectedWidth = 3;
    } else if (secureValue > 0.3) {
      selectedWidth = 2;
    }

    if (selectedWidth === 4 && pattern.at(-1) === 4) {
      selectedWidth = 1;
    }

    pattern.push(selectedWidth);
  }

  return pattern;
}
