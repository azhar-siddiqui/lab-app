import { NavGroup } from "@/types";

/**
 * Navigation configuration with RBAC support
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 * Items are organized into groups, each rendered with a SidebarGroupLabel.
 *
 * RBAC Access Control:
 * Each navigation item can have an `access` property that controls visibility
 * based on permissions, plans, features, roles, and organization context.
 *
 * Examples:
 *
 * 1. Require organization:
 *    access: { requireOrg: true }
 *
 * 2. Require specific permission:
 *    access: { requireOrg: true, permission: 'org:teams:manage' }
 *
 * 3. Require specific plan:
 *    access: { plan: 'pro' }
 *
 * 4. Require specific feature:
 *    access: { feature: 'premium_access' }
 *
 * 5. Require specific role:
 *    access: { role: 'admin' }
 *
 * 6. Multiple conditions (all must be true):
 *    access: { requireOrg: true, permission: 'org:teams:manage', plan: 'pro' }
 *
 * Note: The `visible` function is deprecated but still supported for backward compatibility.
 * Use the `access` property for new items.
 */
export const navGroups: NavGroup[] = [
  {
    label: "Getting Started",
    items: [
      {
        title: "Introduction",
        url: "/getting-started/introduction",
        icon: "book",
        isActive: false,
        shortcut: ["i", "i"],
      },
      {
        title: "New Case",
        url: "/patients",
        icon: "add",
        isActive: false,
        shortcut: ["ctr", "n"],
      },
    ],
  },
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/overview",
        icon: "dashboard",
        isActive: false,
        shortcut: ["d", "d"],
        items: [],
      },
    ],
  },
  {
    label: "Elements",
    items: [
      {
        title: "Bussiness",
        url: "/dashboard/business",
        icon: "businessplan",
        isActive: true,
        items: [
          {
            title: "Daily Bussiness",
            url: "/dashboard/business/daily",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Expenses",
            url: "/dashboard/business/expenses",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Due Reports",
            url: "/dashboard/business/due-reports",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Activities",
            url: "/dashboard/business/activities",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Case View Reports",
            url: "/dashboard/business/case-view-reports",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Referral Bussiness",
            url: "/dashboard/business/referral",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
        ],
      },
      {
        title: "Cases",
        url: "/dashboard",
        icon: "calendarmonth",
        isActive: true,
        items: [
          {
            title: "Bills",
            url: "/dashboard/bills",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Outsource cases",
            url: "/dashboard/outsource",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Patients",
            url: "/patients",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Referral Doctors",
            url: "/dashboard/referral-doctors",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
        ],
      },
      {
        title: "Labs",
        url: "/dashboard/cases",
        icon: "microscope",
        isActive: true,
        items: [
          {
            title: "Test Packages",
            url: "/dashboard/test-packages",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Test Categories",
            url: "/dashboard/test-categories",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
          {
            title: "Test Data",
            url: "/test",
            icon: "exclusive",
            shortcut: ["e", "e"],
          },
        ],
      },
      {
        title: "Account",
        url: "#",
        icon: "account",
        isActive: true,
        items: [
          {
            title: "Profile",
            url: "/profile",
            icon: "profile",
            shortcut: ["m", "m"],
          },
        ],
      },
    ],
  },
];
