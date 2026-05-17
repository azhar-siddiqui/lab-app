"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Bell,
  Camera,
  ChevronRight,
  FlaskConical,
  Globe,
  KeyRound,
  Laptop2,
  Loader2,
  LogOut,
  Save,
  ShieldCheck,
  Upload,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

// ─── TypeScript Interfaces ────────────────────────────────────────────────────

interface NavItem {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  description: string;
}

type TabId = "profile" | "lab-settings" | "security";

// ─── Zod Schemas ──────────────────────────────────────────────────────────────

const userProfileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email(),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .max(15, "Phone number too long."),
  employeeId: z.string().readonly(),
});

const labSettingsSchema = z.object({
  criticalAlerts: z.boolean(),
  // printingLayout: z.enum(["standard-a4", "pre-printed", "compact"]),
});

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/\d/, "Must contain a number.")
      .regex(/[^A-Za-z0-9]/, "Must contain a special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type UserProfileInput = z.infer<typeof userProfileSchema>;
type LabSettingsInput = z.infer<typeof labSettingsSchema>;
type SecurityInput = z.infer<typeof securitySchema>;

// ─── Mock sleep ───────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    id: "profile",
    label: "User Profile",
    icon: <User className="size-4" />,
    description: "Personal details & avatar",
  },
  {
    id: "lab-settings",
    label: "Lab Settings",
    icon: <FlaskConical className="size-4" />,
    description: "Pathology defaults & alerts",
  },
  {
    id: "security",
    label: "Account & Security",
    icon: <ShieldCheck className="size-4" />,
    description: "Password & sessions",
  },
];

// ─── Active Sessions (static mock) ───────────────────────────────────────────

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

const MOCK_SESSIONS: Session[] = [
  {
    id: "s1",
    device: "Chrome on Windows",
    location: "Mumbai, Maharashtra",
    lastActive: "Active now",
    isCurrent: true,
  },
  {
    id: "s2",
    device: "Safari on iPhone",
    location: "Pune, Maharashtra",
    lastActive: "2 hours ago",
    isCurrent: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface SectionHeaderPops {
  title: string;
  description: string;
}

function SectionHeader({ title, description }: Readonly<SectionHeaderPops>) {
  return (
    <CardHeader className="pb-4">
      <CardTitle className="tracking-tight">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
}

// ─── Section 1 — User Profile ────────────────────────────────────────────────

function UserProfileSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const form = useForm<UserProfileInput>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullName: "Ahatesham Siddiqui",
      email: "medicapathologylab@gmail.com",
      phone: "+91 9011768487",
      employeeId: "EMP-PATH-0042",
    },
  });

  async function onSubmit(data: UserProfileInput) {
    setIsLoading(true);
    await sleep(1000);
    console.log("Profile saved:", data);
    setIsLoading(false);
    toast("Profile updated", {
      description: "Your personal details have been saved successfully.",
    });
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setAvatarSrc(URL.createObjectURL(file));
  }

  return (
    <Card className="shadow-none">
      <SectionHeader
        title="User Profile"
        description="Manage your personal information visible across the system."
      />
      <Separator />
      <CardContent className="pt-6">
        {/* Avatar */}
        <div className="mb-8 flex items-center gap-5">
          <div className="group relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarSrc ?? undefined} alt="Profile photo" />
              <AvatarFallback className="bg-primary/30 text-xl font-bold text-primary">
                AZ
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              aria-label="Upload profile photo"
            >
              <Camera className="size-5 text-primary-foreground" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Profile Photo</p>
            <p className="mt-0.5 text-xs">JPG, PNG or WebP. Max 2MB.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2 h-8 gap-1.5 text-xs border-primary-foreground"
              onClick={() => fileRef.current?.click()}
            >
              <Upload className="h-3 w-3" /> Upload Photo
            </Button>
          </div>
        </div>

        {/* Form */}
        <form
          id="form-profile"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Dr. John Doe"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Phone */}
              <Controller
                control={form.control}
                name="phone"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <Input
                      {...field}
                      type="tel"
                      id="phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="+91 98765 43210"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email — read-only */}
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      aria-invalid={fieldState.invalid}
                      disabled
                    />
                  </Field>
                )}
              />

              {/* Employee ID — read-only */}
              <Controller
                control={form.control}
                name="employeeId"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="employeeId">
                      Employee ID / License No.
                    </FieldLabel>
                    <Input
                      {...field}
                      id="employeeId"
                      aria-invalid={fieldState.invalid}
                      disabled
                    />
                  </Field>
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isLoading ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Section 2 — Lab Settings ────────────────────────────────────────────────

function LabSettingsSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [sigFileName, setSigFileName] = useState<string | null>(null);
  const sigFileRef = useRef<HTMLInputElement>(null);

  const form = useForm<LabSettingsInput>({
    resolver: zodResolver(labSettingsSchema),
    defaultValues: {
      criticalAlerts: true,
      // printingLayout: "standard-a4",
    },
  });

  async function onSubmit(data: LabSettingsInput) {
    setIsLoading(true);
    await sleep(1000);
    console.log("Lab settings saved:", data);
    setIsLoading(false);
    toast("Lab settings updated", {
      description: "Your pathology preferences have been saved.",
    });
  }

  function handleSigUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setSigFileName(file.name);
  }

  return (
    <Card>
      <SectionHeader
        title="Lab & Pathology Settings"
        description="Configure default preferences for report generation and clinical alerts."
      />
      <Separator />
      <CardContent className="pt-6">
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7"
        >
          <FieldGroup>
            {/* Digital Signature Upload */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Digital Signature</p>
              <button
                type="button"
                onClick={() => sigFileRef.current?.click()}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-primary border-dashed  px-6 py-8 text-center transition-colors hover:border-primary hover:bg-primary/30 bg-background w-full"
                aria-label="Upload digital signature"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <Upload className="h-5 w-5 text-slate-500" />
                </div>
                {sigFileName ? (
                  <div>
                    <p className="text-[13px] font-semibold text-cyan-700">
                      {sigFileName}
                    </p>
                    <p className="text-[11.5px] text-slate-400">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[13px] font-semibold text-slate-600">
                      Upload signature image
                    </p>
                    <p className="text-[11.5px] text-slate-400">
                      PNG or JPG, transparent background recommended
                    </p>
                  </div>
                )}
              </button>
              <input
                ref={sigFileRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={handleSigUpload}
              />
              <p className="text-xs">
                This signature will be appended to all lab reports you generate.
              </p>
            </div>

            <Separator />

            {/* Critical Alerts Toggle */}
            <Controller
              control={form.control}
              name="criticalAlerts"
              render={({ field }) => (
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldLabel htmlFor="criticalAlerts">
                      <Bell className="size-4 text-destructive" />
                      Critical Value Alerts
                    </FieldLabel>
                    <FieldDescription className="ml-6">
                      Receive instant SMS/Email alerts for critical panic values
                      (e.g., critically low/high blood counts).
                    </FieldDescription>
                  </FieldContent>
                  <Switch
                    id="criticalAlerts"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </Field>
              )}
            />

            <div className="flex justify-end pt-1">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isLoading ? "Saving…" : "Save Settings"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Section 3 — Account & Security ─────────────────────────────────────────

function SecuritySection() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SecurityInput>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SecurityInput) {
    setIsLoading(true);
    await sleep(1000);
    console.log("Password change:", data);
    setIsLoading(false);
    form.reset();
    toast("Password updated", {
      description: "Your password has been changed successfully.",
    });
  }

  return (
    <div className="space-y-5">
      {/* Change Password */}
      <Card className="border-slate-200 shadow-none">
        <SectionHeader
          title="Change Password"
          description="Update your login password. Use a strong, unique password."
        />
        <Separator />
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup>
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel data-invalid={fieldState.invalid}>
                      Current Password
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      placeholder="Enter current password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Controller
                  name="newPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel data-invalid={fieldState.invalid}>
                        New Password
                      </FieldLabel>
                      <PasswordInput
                        {...field}
                        placeholder="Min 8 chars, uppercase, number"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel data-invalid={fieldState.invalid}>
                        Confirm New Password
                      </FieldLabel>
                      <PasswordInput
                        {...field}
                        placeholder="Repeat new password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Password requirements */}
              {/* <div >
                
              </div> */}

              <div className="flex justify-end pt-1">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <KeyRound className="h-4 w-4" />
                  )}
                  {isLoading ? "Updating…" : "Update Password"}
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <SectionHeader
          title="Active Sessions"
          description="Manage devices currently signed in to your account."
        />
        <Separator />
        <CardContent className="pt-5">
          <div className="space-y-3">
            {MOCK_SESSIONS.map((session: Session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-xl border border-primary px-4 py-3.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
                    <Laptop2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{session.device}</p>
                      {session.isCurrent && (
                        <Badge variant="outline">Current</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="size-4" />
                      <p className="text-xs">
                        {session.location} · {session.lastActive}
                      </p>
                    </div>
                  </div>
                </div>
                {!session.isCurrent && (
                  <Button variant="destructive">
                    <LogOut /> Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 shadow-none">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <CardTitle className="text-base font-bold text-destructive">
              Danger Zone
            </CardTitle>
          </div>
          <CardDescription className="text-sm">
            These actions are irreversible. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-5">
          <div className="flex items-center justify-between rounded-xl border border-primary px-5 py-4">
            <div>
              <p className="text-sm font-semibold">Deactivate Account</p>
              <p className="mt-0.5 text-sm">
                Your account and all associated data will be disabled. Contact
                your admin to restore access.
              </p>
            </div>
            <Button variant="destructive">Deactivate</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const PANEL: Record<TabId, React.ReactNode> = {
    profile: <UserProfileSection />,
    "lab-settings": <LabSettingsSection />,
    security: <SecuritySection />,
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[350px_1fr] relative">
      {/* ── Sidebar nav ── */}
      <aside className="sticky h-fit top-16">
        <nav className="space-y-1" aria-label="Settings navigation">
          {NAV_ITEMS.map((item: NavItem) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-150",
                  isActive
                    ? "border-primary bg-primary/20 shadow-sm"
                    : "border-transparent hover:border-primary hover:bg-primary/20",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary",
                    isActive ? "text-primary-foreground" : "text-muted",
                  ].join(" ")}
                >
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className={[
                      "text-sm font-semibold leading-tight",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground",
                    ].join(" ")}
                  >
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-tight">
                    {item.description}
                  </p>
                </div>
                <ChevronRight
                  className={[
                    "ml-auto mt-1 h-3.5 w-3.5 shrink-0 transition-colors",
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ── Active panel ── */}
      <section aria-live="polite">{PANEL[activeTab]}</section>
    </div>
  );
}
