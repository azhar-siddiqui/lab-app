import {
  ClipboardList,
  FlaskConical,
  LayoutDashboard,
  Printer,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";

export const workflowSteps = [
  {
    step: 1,
    title: "Register a patient",
    description:
      "Create a new case with patient details, referring doctor, test groups, and billing information.",
    href: "/patients/new",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Configure your test catalog",
    description:
      "Set up test groups, categories, units, and reference ranges so results are entered accurately.",
    href: "/test",
    icon: FlaskConical,
  },
  {
    step: 3,
    title: "Enter test results",
    description:
      "Open a patient report, fill in values, and review them against configured reference ranges.",
    href: "/patient-report",
    icon: ClipboardList,
  },
  {
    step: 4,
    title: "Print & deliver reports",
    description:
      "Preview branded reports with your lab header, signature, and QR code — then print for the patient.",
    href: "/patient-report",
    icon: Printer,
  },
];

export const modules = [
  {
    title: "Dashboard",
    description:
      "Monitor daily cases, pending reports, and lab activity from a single overview.",
    href: "/dashboard/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Patients",
    description:
      "Manage your patient database, register new cases, and track billing per visit.",
    href: "/patients",
    icon: Users,
  },
  {
    title: "Test catalog",
    description:
      "Organize test groups, categories, units, and male/female reference ranges.",
    href: "/test",
    icon: FlaskConical,
  },
  {
    title: "Patient reports",
    description:
      "Enter results, preview layouts, and generate print-ready pathology reports.",
    href: "/patient-report",
    icon: Printer,
  },
  {
    title: "Profile & settings",
    description:
      "Update your lab profile, upload signatures, and manage account security.",
    href: "/profile",
    icon: Settings,
  },
];

export const bestPractices = [
  "Verify reference ranges in your test catalog before printing reports for patients.",
  "Keep lab name, address, and signature updated under Profile for accurate report headers.",
  "Register the referring doctor on each case to maintain proper commission tracking.",
  "Use the report preview before printing to confirm formatting and patient details.",
];