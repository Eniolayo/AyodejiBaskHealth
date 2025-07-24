import Typography from "@/components/ui/typography";
import { summaryData } from "@/data/dashboard-data";

export const SummarySection = () => {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50">
      <div className="border-b border-neutral-200 px-3 py-3.5">
        <Typography variant="body-01" className="text-text-primary">
          Summary
        </Typography>
      </div>
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
    </div>
  );
};
