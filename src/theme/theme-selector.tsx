"use client";

import { Icons } from "@/components/common/icons";
import { Kbd } from "@/components/ui/kbd";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeConfig } from "./active-theme";
import { THEMES } from "./theme.config";

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();
  console.log("activeTheme", activeTheme);
  return (
    <Select
      value={activeTheme}
      onValueChange={(value) => setActiveTheme(value ?? activeTheme)}
    >
      <SelectTrigger
        id="theme-selector"
        className="justify-start *:data-[slot=select-value]:w-28 "
      >
        <span className="text-muted-foreground hidden sm:block">
          <Icons.palette />
        </span>
        <span className="text-muted-foreground block sm:hidden">Theme</span>
        <SelectValue placeholder="Select a theme" className="capitalize" />
        <Kbd>T T</Kbd>
      </SelectTrigger>
      <SelectContent>
        {THEMES.length > 0 && (
          <SelectGroup>
            <SelectLabel>Themes</SelectLabel>
            {THEMES.map((theme) => (
              <SelectItem
                key={theme.name}
                value={theme.value}
                className="py-1.5"
              >
                {theme.name}
              </SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
