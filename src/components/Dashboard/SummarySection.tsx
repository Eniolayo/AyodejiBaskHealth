import Typography from "@/components/ui/typography";
import { summaryData } from "@/data/dashboard-data";

export const SummarySection = () => {
  return (
    <div className="bg-neutral-50  rounded-lg border border-neutral-200">
      <div className="border-b px-3 py-3.5 border-neutral-200 ">
        <Typography variant="body-01" className="text-text-primary ">
          Summary
        </Typography>
      </div>
      <div className="">
        <div className="py-3.5 px-[15px] border-b border-neutral-200">
          <Typography variant="body-02" className="text-neutral-400 mb-2">
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
        <div className="py-3.5 px-[15px] border-b border-neutral-200">
          <Typography variant="body-02" className="text-neutral-400 mb-2">
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
        <div className="py-3.5 px-[15px] border-b border-neutral-200">
          <Typography variant="body-02" className="text-neutral-400 mb-2">
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
        <div className="py-3.5 px-[15px] ">
          <Typography variant="body-02" className="text-neutral-400 mb-2">
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
