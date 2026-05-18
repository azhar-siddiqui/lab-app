import { ThemeModeToggle } from "@/theme/theme-mode-toggle";
import { ThemeSelector } from "@/theme/theme-selector";
import { Breadcrumbs } from "../common/breadcrumbs";
import SearchInput from "../common/search-input";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-6" />
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden md:flex">
          <SearchInput />
        </div>
        <ThemeModeToggle />
        <div className="hidden sm:block">
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
