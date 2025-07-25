import Typography from "@/components/ui/typography";
import { Table, TableColumn } from "@/components/ui/table";
import { paymentsHistoryData } from "@/data/dashboard-data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";
import Dropdown from "@/components/ui/dropdown";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState } from "react";

type PaymentData = (typeof paymentsHistoryData)[0];
type PaymentColumnKey = keyof PaymentData;

const columnOptions: { key: PaymentColumnKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "email", label: "Email" },
  { key: "amount", label: "Amount" },
  { key: "totalNet", label: "Total net" },
];

export const PaymentsHistorySection = () => {
  const [selectedRows, setSelectedRows] = useState<PaymentData[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<PaymentColumnKey[]>([]);

  const columns: TableColumn<PaymentData>[] = [
    {
      key: "status",
      label: "Status",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
    },
    {
      key: "totalNet",
      label: "Total net",
      sortable: true,
    },
  ];

  const visibleColumns = columns.filter(
    (col) => !hiddenColumns.includes(col.key)
  );

  const handleRowSelect = (selectedRows: PaymentData[]) => {
    setSelectedRows(selectedRows);
  };

  const toggleColumn = (columnKey: PaymentColumnKey) => {
    setHiddenColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((col) => col !== columnKey)
        : [...prev, columnKey]
    );
  };

  const isColumnHidden = (columnKey: PaymentColumnKey) =>
    hiddenColumns.includes(columnKey);

  return (
    <Card>
      <CardHeader title="Payments history" />
      <CardContent className="p-3">
        <Table
          data={paymentsHistoryData}
          columns={visibleColumns}
          selectable={true}
          searchable={true}
          pagination={false}
          itemsPerPage={5}
          onRowSelect={handleRowSelect}
          loading={false}
          emptyMessage="No payments found"
          toolbarRight={
            <Dropdown
              trigger={
                <button className="text-text-primary flex items-center gap-3 rounded-md border border-neutral-200 px-2 py-1.5 text-[13px] transition-colors hover:bg-neutral-200">
                  <span>Columns</span>
                  <ChevronsUpDown className="text-text-primary size-3" />
                </button>
              }
              dropdownClassName="bg-neutral-50 border border-neutral-200 rounded-md shadow-lg p-2 min-w-36"
              position="left"
            >
              <div className="space-y-2">
                {columnOptions.map((option) => (
                  <label
                    key={option.key}
                    className="flex cursor-pointer items-center gap-2 rounded p-1 hover:bg-neutral-50"
                  >
                    <input
                      type="checkbox"
                      checked={!isColumnHidden(option.key)}
                      onChange={() => toggleColumn(option.key)}
                      className="rounded border-neutral-200 bg-white"
                    />
                    <Typography variant="body-02" className="text-text-primary">
                      {option.label}
                    </Typography>
                  </label>
                ))}
              </div>
            </Dropdown>
          }
        />
        <div className="mt-3 flex items-center justify-between">
          <Typography variant="body-02" className="text-neutral-500">
            {selectedRows.length} of {paymentsHistoryData.length} row(s)
            selected
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
      </CardContent>
    </Card>
  );
};
