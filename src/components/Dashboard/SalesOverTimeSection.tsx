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
    <div className="bg-neutral-50 rounded-lg border border-neutral-200">
      <div className="border-b px-3 py-3.5 border-neutral-200">
        <Typography variant="body-01" className="text-text-primary">
          Total sales over time
        </Typography>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesOverTimeData}
            margin={{ top: 12, right: 12, left: 12, bottom: 12 }}
          >
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
              fill="#0d72a5"
              fillOpacity={0.8}
            />
            <Area
              type="monotone"
              dataKey="prod2"
              stackId="1"
              stroke="#40b1e9"
              fill="#40b1e9"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="px-3">
        <Typography variant="body-02" className="text-text-primary">
          Trending up by 5.2% this month
        </Typography>
        <Typography variant="body-02" className="text-neutral-400">
          January - June 2024
        </Typography>
      </div>
    </div>
  );
};
