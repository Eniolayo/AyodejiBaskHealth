import Typography from "@/components/ui/typography";
import { summaryData } from "@/data/dashboard-data";

export const SummarySection = () => {
  return (
    <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200">
      <Typography variant="heading-04" className="text-text-primary mb-4">
        Summary
      </Typography>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Typography variant="body-02" className="text-neutral-400">
            Total sales
          </Typography>
          <Typography
            variant="body-01"
            className="text-text-primary font-medium"
          >
            ${summaryData.totalSales.toLocaleString()}.00 USD
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="body-02" className="text-neutral-400">
            Total expenses
          </Typography>
          <Typography
            variant="body-01"
            className="text-text-primary font-medium"
          >
            ${summaryData.totalExpenses.toLocaleString()}.00 USD
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="body-02" className="text-neutral-400">
            Gross profit
          </Typography>
          <Typography
            variant="body-01"
            className="text-text-primary font-medium"
          >
            ${summaryData.grossProfit.toLocaleString()}.00 USD
          </Typography>
        </div>
        <div className="flex justify-between items-center">
          <Typography variant="body-02" className="text-neutral-400">
            Total orders
          </Typography>
          <Typography
            variant="body-01"
            className="text-text-primary font-medium"
          >
            {summaryData.totalOrders.toLocaleString()}
          </Typography>
        </div>
      </div>
    </div>
  );
};
