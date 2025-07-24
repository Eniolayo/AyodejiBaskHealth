import Typography from "@/components/ui/typography";
import { paymentsHistoryData } from "@/data/dashboard-data";
import { ChevronsUpDown, ChevronDown } from "lucide-react";

export const PaymentsHistorySection = () => {
  return (
    <div className="bg-neutral-50 rounded-lg border border-neutral-200">
      <div className="border-b px-3 py-3.5 border-neutral-200">
        <Typography variant="body-01" className="text-text-primary">
          Payments history
        </Typography>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Filter..."
              className="px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-md text-sm text-text-primary placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-neutral-100 border border-neutral-300 rounded-md text-sm text-text-primary hover:bg-neutral-200 transition-colors">
            <span>Columns</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-neutral-100 border border-neutral-300 rounded-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-200 border-b border-neutral-300">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-neutral-400 bg-white"
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Typography
                      variant="body-02"
                      className="text-neutral-700 font-medium"
                    >
                      Status
                    </Typography>
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center gap-1">
                    <Typography
                      variant="body-02"
                      className="text-neutral-700 font-medium"
                    >
                      Email
                    </Typography>
                    <ChevronsUpDown className="w-4 h-4 text-neutral-500" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left">
                  <Typography
                    variant="body-02"
                    className="text-neutral-700 font-medium"
                  >
                    Amount
                  </Typography>
                </th>
                <th className="px-4 py-3 text-left">
                  <Typography
                    variant="body-02"
                    className="text-neutral-700 font-medium"
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
                  className="border-b border-neutral-200 last:border-b-0 bg-white hover:bg-neutral-200"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded border-neutral-400 bg-white"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.email}
                    </Typography>
                  </td>
                  <td className="px-4 py-3">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.amount}
                    </Typography>
                  </td>
                  <td className="px-4 py-3">
                    <Typography variant="body-02" className="text-text-primary">
                      {payment.totalNet}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Typography variant="body-02" className="text-neutral-500">
            0 of 5 row(s) selected
          </Typography>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-sm text-neutral-500 hover:text-text-primary transition-colors">
              &lt;
            </button>
            <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              1
            </button>
            <button className="px-2 py-1 text-sm text-neutral-500 hover:text-text-primary transition-colors">
              2
            </button>
            <button className="px-2 py-1 text-sm text-neutral-500 hover:text-text-primary transition-colors">
              3
            </button>
            <span className="px-2 py-1 text-sm text-neutral-500">...</span>
            <button className="px-2 py-1 text-sm text-neutral-500 hover:text-text-primary transition-colors">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
