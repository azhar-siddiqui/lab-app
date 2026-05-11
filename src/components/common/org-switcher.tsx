"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { IconCheck, IconPlus, IconStackFront } from "@tabler/icons-react";
import { Icons } from "./icons";

const labTaglines: string[] = [
  "Connecting Health Through Diagnostics",
  "Precision in Every Test, Care in Every Result",
  "Bringing Clarity to Your Health",
  "Where Science Meets Care",
  "Accurate Reports, Better Lives",
  "Empowering Health Through Reliable Testing",
  "Your Health, Our Priority in Every Sample",
  "Trusted Diagnostics for Every Life",
  "From Sample to Solution",
  "Delivering Confidence Through Accuracy",
  "Advanced Testing, Compassionate Care",
  "Committed to Precision, Dedicated to You",
];

export function OrgSwitcher() {
  const { isMobile, state } = useSidebar();
  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="bg-primary flex aspect-square size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg text-xl">
                  🍽️
                </div>
                <div
                  className={`grid flex-1 text-left text-sm leading-tight transition-all duration-200 ease-in-out ${
                    state === "collapsed"
                      ? "invisible max-w-0 overflow-hidden opacity-0"
                      : "visible max-w-full opacity-100"
                  }`}
                >
                  <span className="truncate font-medium">
                    Madi{""}
                    <span className="truncate font-bold text-primary">
                      Care
                    </span>
                  </span>
                  <div className="overflow-hidden">
                    <span
                      className={`
                      inline-block text-muted-foreground text-xs 
                      whitespace-nowrap 
                      ${state === "collapsed" ? "" : "animate-marquee"}
                    `}
                    >
                      Precision in Every Test, Care in Every Result
                    </span>
                  </div>
                </div>
                <Icons.chevronsUpDown
                  className={`ml-auto transition-all duration-200 ease-in-out ${
                    state === "collapsed"
                      ? "invisible max-w-0 opacity-0"
                      : "visible max-w-full opacity-100"
                  }`}
                />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Hotels
            </DropdownMenuLabel>
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center overflow-hidden rounded-md border">
                <IconStackFront className="size-3.5 shrink-0" />
              </div>
              Blue Star
              <IconCheck className="ml-auto size-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => {
                router.push("/dashboard/workspaces");
              }}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <IconPlus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add Hotels
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
