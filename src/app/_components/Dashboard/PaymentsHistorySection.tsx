"use client";

import Typography from "@/components/ui/typography";
import { Table, TableColumn } from "@/components/ui/table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";
import Dropdown from "@/components/ui/dropdown";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardDataContext } from "@/contexts/DashboardContext";

type PaymentData = {
  id: number;
  status: string;
  name: string;
  amount: string;
  totalNet: string;
};

type PaymentColumnKey = keyof PaymentData;

const columnOptions: { key: PaymentColumnKey; label: string }[] = [
  { key: "status", label: "Status" },
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
  { key: "totalNet", label: "Total net" },
];

const ITEMS_PER_PAGE = 5;

export const PaymentsHistorySection = () => {
  const { data, isLoading } = useDashboardDataContext();
  const [selectedRows, setSelectedRows] = useState<PaymentData[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<PaymentColumnKey[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  let paymentsHistoryData: PaymentData[] = [];

  if (data?.data?.dashboardData) {
    const d = data.data.dashboardData;
    paymentsHistoryData = d.tables.recentTransactions.map(
      (t: { id: number; user: string; amount: string }) => ({
        id: t.id,
        status: "Success",
        name: t.user,
        amount: t.amount,
        totalNet: t.amount,
      })
    );
  }

  const filteredData = useMemo(() => {
    return paymentsHistoryData.filter((payment) =>
      payment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [paymentsHistoryData, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const columns: TableColumn<PaymentData>[] = [
    { key: "status", label: "Status" },
    { key: "name", label: "Name" },
    { key: "amount", label: "Amount", sortable: true },
    { key: "totalNet", label: "Total net", sortable: true },
  ];

  const visibleColumns = columns.filter(
    (col) => !hiddenColumns.includes(col.key)
  );

  const handleRowSelect = (rows: PaymentData[]) => {
    setSelectedRows(rows);
  };

  const toggleColumn = (columnKey: PaymentColumnKey) => {
    setHiddenColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((col) => col !== columnKey)
        : [...prev, columnKey]
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader title="Payments history" />
        <CardContent className="p-3">
          <Skeleton variant="rectangular" className="mb-4 h-40 w-full" />
          <Skeleton variant="rectangular" className="h-8 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (!paymentsHistoryData.length) return null;

  return (
    <Card>
      <CardHeader title="Payments history" />
      <CardContent className="space-y-4 p-3">
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name..."
            className="w-full max-w-sm rounded-md border border-neutral-200 px-3 py-2 text-sm"
          />
          <Dropdown
            trigger={
              <button className="text-text-primary flex items-center gap-3 rounded-md border border-neutral-200 px-2 py-2 text-[13px] transition-colors hover:bg-neutral-200">
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
                    checked={!hiddenColumns.includes(option.key)}
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
        </div>

        <Table
          data={paginatedData}
          columns={visibleColumns}
          selectable
          pagination={false}
          itemsPerPage={ITEMS_PER_PAGE}
          onRowSelect={handleRowSelect}
          loading={false}
          emptyMessage="No payments found"
        />

        <div className="flex items-center justify-between pt-2">
          <Typography variant="body-02" className="text-neutral-500">
            {selectedRows.length} of {filteredData.length} row(s) selected
          </Typography>
          <div className="flex items-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px] disabled:opacity-50"
            >
              <ChevronLeftIcon className="text-text-primary size-4" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`rounded px-2 py-1 ${
                    currentPage === idx + 1
                      ? "bg-neutral-200 font-medium"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="text-text-primary flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-[13px] disabled:opacity-50"
            >
              <ChevronRightIcon className="text-text-primary size-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
