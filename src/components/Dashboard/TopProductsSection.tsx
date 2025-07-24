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
import { CustomBottomBar } from "@/components/charts/CustomBottomBar";

export const TopProductsSection = () => {
  return (
    <div className="bg-neutral-50 rounded-lg border border-neutral-200">
      <div className="border-b px-3 py-3.5 border-neutral-200 ">
        <Typography variant="body-01" className="text-text-primary ">
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
          <div className="w-3 h-3 bg-[#0d72a5] rounded" />
          <Typography variant="body-03" className="text-neutral-400">
            ACME Prod - 01
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[#40b1e9] rounded" />
          <Typography variant="body-03" className="text-neutral-400">
            ACME Prod - 02
          </Typography>
        </div>
      </div>
    </div>
  );
};
