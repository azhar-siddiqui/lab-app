"use server";

import { fetchCaseViewReportsData } from "@/lib/lab-pages-data";
import { getServerSession } from "@/lib/get-session";
import { unauthorized } from "next/navigation";
import { cache } from "react";

export const getCaseViewReports = cache(
  async (dateFrom?: string, dateTo?: string) => {
    const session = await getServerSession();
    const user = session?.user;
    if (!user) return unauthorized();

    return fetchCaseViewReportsData(user.id, dateFrom, dateTo);
  },
);