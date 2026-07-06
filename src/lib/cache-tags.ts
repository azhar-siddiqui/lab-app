export const cacheTags = {
  doctors: (userId: string) => `doctors:${userId}`,
  testGroups: (userId: string) => `test-groups:${userId}`,
  testCategories: (userId: string) => `test-categories:${userId}`,
  testUnits: (userId: string) => `test-units:${userId}`,
  patientReports: (userId: string) => `patient-reports:${userId}`,
} as const;