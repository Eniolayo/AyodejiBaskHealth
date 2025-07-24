import Typography from "@/components/ui/typography";
import { paymentsHistoryData } from "@/data/dashboard-data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";

export const PaymentsHistorySection = () => {
  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50">
      <div className="border-b border-neutral-200 px-3 py-3.5">
        <Typography variant="body-01" className="text-text-primary">
          Payments history
        </Typography>
      </div>
      <div className="p-3">
        <div className="mb-4 flex items-center justify-between">
          <input
            type="text"
            className="text-text-primary min-w-72 rounded-md border border-neutral-200 bg-transparent px-2 py-1 text-[13px] placeholder:text-neutral-400 focus:outline-none"
            placeholder="Search..."
          />
          <button className="text-text-primary flex items-center gap-3 rounded-md border border-neutral-200 px-2 py-1.5 text-[13px] transition-colors hover:bg-neutral-200">
            <span>Columns</span>
            <ChevronsUpDown className="text-text-primary size-3" />
          </button>
        </div>

        <div className="overflow-hidden rounded-md border border-neutral-200">
          <table className="w-full">
            <thead className="border-b border-neutral-200">
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-200 bg-white"
                  />
                </th>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-1">
                    <Typography
                      variant="body-02"
                      className="font-medium text-neutral-400"
                    >
                      Status
                    </Typography>
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  <div className="flex items-center gap-1">
                    <Typography
                      variant="body-02"
                      className="font-medium text-neutral-400"
                    >
                      Email
                    </Typography>
                    <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
                  </div>
                </th>
                <th className="px-4 py-2 text-left">
                  <Typography
                    variant="body-02"
                    className="font-medium text-neutral-400"
                  >
                    Amount
                  </Typography>
                </th>
                <th className="px-4 py-2 text-left">
                  <Typography
                    variant="body-02"
                    className="font-medium text-neutral-400"
                  >
                    Total net
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentsHistoryData.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-neutral-200 bg-transparent last:border-b-0"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-200 bg-white"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.status}
                    </Typography>
                  </td>
                  <td className="px-4 py-2">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.email}
                    </Typography>
                  </td>
                  <td className="px-4 py-2">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.amount}
                    </Typography>
                  </td>
                  <td className="px-4 py-2">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.totalNet}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Typography variant="body-02" className="text-neutral-500">
            0 of 5 row(s) selected
          </Typography>
          <div className="flex items-center gap-3">
            <button className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px]">
              <ChevronLeftIcon className="text-text-primary size-4" />
            </button>
            <div className="flex items-center gap-4">
              <button className="">
                <Typography variant="body-02" className="text-text-primary">
                  1
                </Typography>
              </button>
              <button className="">
                <Typography variant="body-02" className="text-text-primary">
                  2
                </Typography>
              </button>
              <button className="">
                <Typography variant="body-02" className="text-text-primary">
                  3
                </Typography>
              </button>
              <span className="text-text-primary text-sm">...</span>
            </div>
            <button className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px]">
              <ChevronRightIcon className="text-text-primary size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
