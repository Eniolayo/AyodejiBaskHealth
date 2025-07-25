"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardDataContext } from "@/contexts/DashboardDataContext";

export const OrdersSection = () => {
  const { data, isLoading } = useDashboardDataContext();

  let orderData;
  if (data?.data?.dashboardData) {
    const d = data.data.dashboardData;
    orderData = d.charts.salesOverTime.labels.map(
      (month: string, i: number) => ({
        month,
        orders: d.charts.salesOverTime.data[i],
      })
    );
  }

  if (isLoading) {
    return (
      <Card cardId="orders">
        <CardHeader title="Orders" cardId="orders" />
        <CardContent padding="none">
          <div className="flex h-64 items-center justify-center pl-0.5">
            <Skeleton className="h-32 w-full" variant="rectangular" />
          </div>
          <div className="px-3 pb-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-4 w-1/3" />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (!orderData) return null;
  return (
    <Card cardId="orders">
      <CardHeader title="Orders" cardId="orders" />
      <CardContent padding="none">
        <div className="max-h-[240px] overflow-y-auto pr-2 pl-0.5">
          <ResponsiveContainer width="100%" height={orderData.length * 45}>
            <BarChart
              data={orderData}
              layout="vertical"
              margin={{ top: 10, right: 80, left: 10, bottom: 10 }}
            >
              <XAxis type="number" hide={true} />
              <YAxis type="category" hide={true} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#3e4244",
                  border: "1px solid #6b6f71",
                  borderRadius: "8px",
                  color: "#ebebeb",
                }}
              />
              <Bar
                dataKey="orders"
                fill="#0D72A5"
                barSize={32}
                radius={[4, 4, 4, 4]}
              >
                <LabelList
                  dataKey="month"
                  position="insideLeft"
                  style={{
                    fill: "white",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                  offset={10}
                />
                <LabelList
                  dataKey="orders"
                  position="right"
                  style={{
                    fill: "#a3a3a3",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="px-3 py-2">
          <Typography variant="body-02" className="text-text-primary">
            Trending up by 5.2% this month
          </Typography>
          <Typography variant="body-02" className="mt-1.5 text-neutral-400">
            January - June 2027
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
