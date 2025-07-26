"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { JSX } from "react";
import { BarProps } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardDataContext } from "@/contexts/DashboardDataContext";
import { useTheme } from "next-themes";

const CustomBottomBar = (props: BarProps): JSX.Element => {
  const fill = props.fill ?? "#000";
  const x = +(props.x ?? 0);
  const y = +(props.y ?? 0);
  const width = +(props.width ?? 0);
  const height = +(props.height ?? 0);

  const offset = 9;
  const radius = 9;

  return (
    <path
      d={`
        M ${x} ${y + offset + height}
        L ${x} ${y + offset + radius}
        Q ${x} ${y + offset} ${x + radius} ${y + offset}
        L ${x + width - radius} ${y + offset}
        Q ${x + width} ${y + offset} ${x + width} ${y + offset + radius}
        L ${x + width} ${y + offset + height}
        Z
      `}
      fill={fill}
    />
  );
};

export const TopProductsSection = ({
  cardId,
  rowId,
}: { cardId?: string; rowId?: string } = {}) => {
  const { data, isLoading } = useDashboardDataContext();
  const { resolvedTheme } = useTheme();

  let productData;
  if (data?.data?.dashboardData) {
    const d = data.data.dashboardData;
    productData = d.tables.topProducts.map(
      (prod: { name: string; sales: number }) => ({
        month: prod.name.replace(/product\s+/i, ""),
        "ACME Prod - 01": prod.sales, // For demo, all sales in one
        "ACME Prod - 02": Math.floor(prod.sales * 0.6),
        total: prod.sales,
      })
    );
  }

  if (isLoading) {
    return (
      <Card cardId={cardId} rowId={rowId}>
        <CardHeader title="Top products" cardId={cardId} rowId={rowId} />
        <CardContent padding="none">
          <div className="flex h-64 items-center justify-center">
            <Skeleton className="h-32 w-full" variant="rectangular" />
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }
  if (!productData) return null;
  return (
    <Card cardId={cardId} rowId={rowId}>
      <CardHeader title="Top products" cardId={cardId} rowId={rowId} />
      <CardContent padding="none">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={productData}
              margin={{ top: 20, right: 12, left: 12, bottom: 12 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#6b6f71"
                opacity={0.3}
              />
              <XAxis
                dataKey="month"
                stroke={resolvedTheme === "dark" ? "#D7D7D7" : "#3E4244"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide={true} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--neutral-100)",
                  border: "1px solid var(--neutral-200)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
                labelStyle={{
                  color: "var(--text-primary)",
                  fontWeight: "500",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  textTransform: "capitalize",
                }}
                cursor={{ stroke: "var(--neutral-300)", strokeWidth: 1 }}
              />
              <Bar
                dataKey="ACME Prod - 01"
                stackId="a"
                fill={resolvedTheme === "dark" ? "#0d72a5" : "#07557C"}
                radius={[9, 9, 0, 0]}
              />
              <Bar
                dataKey="ACME Prod - 02"
                stackId="a"
                fill={resolvedTheme === "dark" ? "#0d73a5bf" : "#07557Cbf"}
                shape={CustomBottomBar}
              >
                <LabelList
                  dataKey="total"
                  position="top"
                  style={{
                    fill: "#a3a3a3",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 pb-3 sm:pb-0">
          <div className="flex items-center gap-2">
            <div className="bg-brand-500 h-3 w-3 rounded" />
            <Typography variant="body-03" className="text-neutral-400">
              ACME Prod - 01
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-brand-500/75 h-3 w-3 rounded" />
            <Typography variant="body-03" className="text-neutral-400">
              ACME Prod - 02
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
