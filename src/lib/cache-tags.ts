export const cacheTags = {
  doctors: (userId: string) => `doctors:${userId}`,
  testGroups: (userId: string) => `test-groups:${userId}`,
  testCategories: (userId: string) => `test-categories:${userId}`,
  testUnits: (userId: string) => `test-units:${userId}`,
  patientReports: (userId: string) => `patient-reports:${userId}`,
  patientReport: (reportId: string) => `patient-report:${reportId}`,
  patient: (patientId: string) => `patient:${patientId}`,
  testGroup: (testGroupId: string) => `test-group:${testGroupId}`,
  dashboardStats: (userId: string) => `dashboard-stats:${userId}`,
  billingLedger: (userId: string) => `billing-ledger:${userId}`,
  labInsights: (userId: string) => `lab-insights:${userId}`,
  dailyBusiness: (userId: string, dateKey: string) =>
    `daily-business:${userId}:${dateKey}`,
  expenses: (userId: string, dateKey: string) =>
    `expenses:${userId}:${dateKey}`,
} as const;