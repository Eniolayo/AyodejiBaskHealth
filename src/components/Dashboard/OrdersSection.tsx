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
import { orderData } from "@/data/dashboard-data";

export const OrdersSection = () => {
  return (
    <Card>
      <CardHeader title="Orders" />
      <CardContent padding="none">
        <div className="h-64 pl-0.5">
          <ResponsiveContainer width="100%" height="100%">
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
        <div className="px-3 pb-2">
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
