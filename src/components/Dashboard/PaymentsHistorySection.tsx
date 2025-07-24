import Typography from "@/components/ui/typography";
import { paymentsHistoryData } from "@/data/dashboard-data";
import { ChevronsUpDown } from "lucide-react";

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
          <div className="relative">
            <input
              type="text"
              className="text-text-primary w-48 rounded-md border border-neutral-300 bg-transparent px-3 py-0 text-sm placeholder-neutral-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Filter..."
            />
          </div>
          <button className="text-text-primary flex items-center gap-2 rounded-md border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm transition-colors hover:bg-neutral-200">
            <span>Columns</span>
            <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
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

        <div className="mt-4 flex items-center justify-between">
          <Typography variant="body-02" className="text-neutral-500">
            0 of 5 row(s) selected
          </Typography>
          <div className="flex items-center gap-1">
            <button className="hover:text-text-primary px-2 py-1 text-sm text-neutral-500 transition-colors">
              &lt;
            </button>
            <button className="rounded bg-blue-500 px-2 py-1 text-sm text-white transition-colors hover:bg-blue-600">
              1
            </button>
            <button className="hover:text-text-primary px-2 py-1 text-sm text-neutral-500 transition-colors">
              2
            </button>
            <button className="hover:text-text-primary px-2 py-1 text-sm text-neutral-500 transition-colors">
              3
            </button>
            <span className="px-2 py-1 text-sm text-neutral-500">...</span>
            <button className="hover:text-text-primary px-2 py-1 text-sm text-neutral-500 transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
