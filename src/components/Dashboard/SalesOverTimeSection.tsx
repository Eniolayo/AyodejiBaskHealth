"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardDataContext } from "@/hooks/DashboardDataContext";

export const SalesOverTimeSection = () => {
  const { data, isLoading } = useDashboardDataContext();

  let salesOverTimeData;

  if (data?.data?.dashboardData) {
    const d = data.data.dashboardData;
    salesOverTimeData = d.charts.salesOverTime.labels.map(
      (month: string, i: number) => ({
        month: new Date(month).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),

        sales: d.charts.salesOverTime.data[i],
        prod1: d.charts.salesOverTime.data[i],
        prod2: Math.floor(d.charts.salesOverTime.data[i] * 0.6),
      })
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Total sales over time" />
        <CardContent padding="none">
          <div className="flex h-80 w-full items-center justify-center">
            <Skeleton className="h-40 w-full" variant="rectangular" />
          </div>
          <div className="mt-4 px-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="mt-2 h-4 w-1/3" />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (!salesOverTimeData) return null;
  return (
    <Card>
      <CardHeader title="Total sales over time" />
      <CardContent padding="none">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={salesOverTimeData}
              margin={{ top: 20, right: 19, left: 12, bottom: 12 }}
            >
              <defs>
                <linearGradient id="prod2-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(13, 114, 165, 0.6)" />
                  <stop offset="95%" stopColor="rgba(196, 235, 255, 0.6)" />
                </linearGradient>
                <linearGradient id="prod1-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgba(64, 177, 233, 0.4)" />
                  <stop offset="95%" stopColor="rgba(196, 235, 255, 0.4)" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#6b6f71"
                opacity={0.3}
              />

              <XAxis
                dataKey="month"
                stroke="#ebebeb"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                interval="preserveStartEnd"
              />

              <YAxis
                stroke="#ebebeb"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={33}
                tickFormatter={(value) => value.toString()}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#3e4244",
                  border: "1px solid #6b6f71",
                  borderRadius: "8px",
                  color: "#ebebeb",
                }}
              />
              <Area
                type="monotone"
                dataKey="prod1"
                stackId="1"
                stroke="#0d72a5"
                fill="url(#prod1-gradient)"
                fillOpacity={1}
              />
              <Area
                type="monotone"
                dataKey="prod2"
                stackId="1"
                stroke="#40b1e9"
                fill="url(#prod2-gradient)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="px-3">
          <Typography variant="body-02" className="text-text-primary">
            Trending up by 5.2% this month
          </Typography>
          <Typography variant="body-02" className="mt-1.5 text-neutral-400">
            January - June 2024
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
