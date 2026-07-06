export type OnboardingUser = {
  email?: string;
  emailVerified: boolean;
  onboardingCompleted?: boolean | null;
};

export function needsPhoneOnboarding(user: OnboardingUser) {
  return user.emailVerified && !user.onboardingCompleted;
}

export function getPostAuthRedirect(user: OnboardingUser) {
  if (!user.emailVerified) {
    return user.email
      ? `/auth/verify-email?email=${encodeURIComponent(user.email)}`
      : "/auth/verify-email";
  }

  if (needsPhoneOnboarding(user)) {
    return "/auth/onboarding/phone";
  }

  return "/dashboard/overview";
}

import { getAppUrl } from "./app-url";

export function getOnboardingCallbackUrl() {
  return `${getAppUrl()}/auth/onboarding/phone`;
}