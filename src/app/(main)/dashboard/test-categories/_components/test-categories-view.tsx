import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TestCategoryRow } from "@/lib/lab-pages-data";
import { buttonVariants } from "@/components/ui/button";
import { FolderOpen, Plus } from "lucide-react";
import Link from "next/link";

type TestCategoriesViewProps = {
  categories: TestCategoryRow[];
};

export function TestCategoriesView({ categories }: TestCategoriesViewProps) {
  if (categories.length === 0) {
    return (
      <Card className="gap-0 py-0">
        <CardContent className="flex min-h-70 flex-col items-center justify-center gap-4 px-6 py-14 text-center">
          <div className="bg-muted text-muted-foreground flex size-12 items-center justify-center rounded-xl">
            <FolderOpen className="size-6" />
          </div>
          <div className="max-w-sm space-y-1">
            <p className="font-medium">No categories yet</p>
            <p className="text-muted-foreground text-sm">
              Categories are created automatically when you add test packages.
            </p>
          </div>
          <Link href="/test/new" className={buttonVariants({ size: "sm" })}>
            <Plus className="mr-2 size-4" />
            Create test package
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Card key={category.id} className="h-full">
          <CardHeader>
            <CardTitle className="text-base">{category.name}</CardTitle>
            <CardDescription>
              {category.description || "No description provided."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">
              {category.testGroupCount}{" "}
              {category.testGroupCount === 1 ? "package" : "packages"}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}