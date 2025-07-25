"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardDataContext } from "@/contexts/DashboardContext";

export const SummarySection = () => {
  const { isLoading, summary: summaryData } = useDashboardDataContext();

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Summary" />
        <CardContent padding="none">
          <div className="space-y-4 p-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (!summaryData) return null;
  return (
    <Card>
      <CardHeader title="Summary" />
      <CardContent padding="none">
        <div className="">
          <div className="border-b border-neutral-200 px-[15px] py-3.5">
            <Typography variant="body-02" className="mb-2 text-neutral-400">
              Total sales
            </Typography>
            <Typography
              variant="heading-04"
              className="text-text-primary flex items-center gap-1"
            >
              ${summaryData.totalSales.toLocaleString()}.00
              <Typography variant="body-01" as={"span"}>
                USD
              </Typography>
            </Typography>
          </div>
          <div className="border-b border-neutral-200 px-[15px] py-3.5">
            <Typography variant="body-02" className="mb-2 text-neutral-400">
              Total expenses
            </Typography>
            <Typography
              variant="heading-04"
              className="text-text-primary flex items-center gap-1"
            >
              ${summaryData.totalExpenses.toLocaleString()}.00
              <Typography variant="body-01" as={"span"}>
                USD
              </Typography>
            </Typography>
          </div>
          <div className="border-b border-neutral-200 px-[15px] py-3.5">
            <Typography variant="body-02" className="mb-2 text-neutral-400">
              Gross profit
            </Typography>
            <Typography
              variant="heading-04"
              className="text-text-primary flex items-center gap-1"
            >
              ${summaryData.grossProfit.toLocaleString()}.00
              <Typography variant="body-01" as={"span"}>
                USD
              </Typography>
            </Typography>
          </div>
          <div className="px-[15px] py-3.5">
            <Typography variant="body-02" className="mb-2 text-neutral-400">
              Total orders
            </Typography>
            <Typography
              variant="heading-04"
              className="text-text-primary flex items-center gap-1"
            >
              {summaryData.totalOrders.toLocaleString()}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
