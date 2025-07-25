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
import { salesOverTimeData } from "@/data/dashboard-data";

export const SalesOverTimeSection = () => {
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
