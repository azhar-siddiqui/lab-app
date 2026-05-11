"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
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
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
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
              <span className="truncate font-bold text-primary">Care</span>
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
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
