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
import { productData } from "@/data/dashboard-data";
import { JSX } from "react";
import { BarProps } from "recharts";

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

export const TopProductsSection = () => {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50">
      <div className="border-b border-neutral-200 px-3 py-3.5">
        <Typography variant="body-01" className="text-text-primary">
          Top products
        </Typography>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={productData}
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
            <YAxis hide={true} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#3e4244",
                border: "1px solid #6b6f71",
                borderRadius: "8px",
                color: "#ebebeb",
              }}
            />
            <Bar
              dataKey="ACME Prod - 01"
              stackId="a"
              fill="#0d72a5"
              radius={[9, 9, 0, 0]}
            />
            <Bar
              dataKey="ACME Prod - 02"
              stackId="a"
              fill="#40b1e9"
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
      <div className="flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#0d72a5]" />
          <Typography variant="body-03" className="text-neutral-400">
            ACME Prod - 01
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#40b1e9]" />
          <Typography variant="body-03" className="text-neutral-400">
            ACME Prod - 02
          </Typography>
        </div>
      </div>
    </div>
  );
};
