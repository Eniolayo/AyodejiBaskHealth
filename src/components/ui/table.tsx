import * as React from "react";
import { cn } from "@/lib/utils";
import Typography from "./typography";
import { Button, getPaginationActiveClasses } from "./button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDown,
} from "lucide-react";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  selectable?: boolean;
  searchable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  loading?: boolean;
  emptyMessage?: string;
  toolbarRight?: React.ReactNode;
}

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  selectable?: boolean;
  selectAll?: boolean;
  onSelectAll?: () => void;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  sortColumn?: keyof T;
  sortDirection?: "asc" | "desc";
}

export interface TableRowProps<T> {
  row: T;
  columns: TableColumn<T>[];
  index: number;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (row: T) => void;
}

const TableHeader = <T,>({
  columns,
  selectable,
  selectAll,
  onSelectAll,
  onSort,
  sortColumn,
  sortDirection,
}: TableHeaderProps<T>) => {
  const handleSort = (columnKey: keyof T) => {
    if (!onSort) return;
    const newDirection =
      sortColumn === columnKey && sortDirection === "asc" ? "desc" : "asc";
    onSort(columnKey, newDirection);
  };

  return (
    <thead className="border-b border-neutral-200">
      <tr>
        {selectable && (
          <th className="px-4 py-2 text-left">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={onSelectAll}
              className="rounded border-neutral-200 bg-white"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className={cn(
              "px-4 py-2 text-left",
              column.width && { width: column.width }
            )}
          >
            <div className="flex items-center gap-1">
              <Typography
                variant="body-02"
                className="font-medium text-neutral-400"
              >
                {column.label}
              </Typography>
              {column.sortable && onSort && (
                <button
                  onClick={() => handleSort(column.key)}
                  className="ml-1 rounded p-1 hover:bg-neutral-100"
                >
                  <ChevronsUpDown className="h-4 w-4 text-neutral-500" />
                </button>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableRow = <T,>({
  row,
  columns,
  index,
  selectable,
  selected,
  onSelect,
}: TableRowProps<T>) => {
  return (
    <tr className="border-b border-neutral-200 bg-transparent last:border-b-0">
      {selectable && (
        <td className="px-4 py-2">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect?.(row)}
            className="rounded border-neutral-200 bg-white"
          />
        </td>
      )}
      {columns.map((column) => (
        <td key={String(column.key)} className="px-4 py-2">
          {column.render ? (
            column.render(row[column.key], row, index)
          ) : (
            <Typography variant="body-02" className="text-text-primary">
              {String(row[column.key])}
            </Typography>
          )}
        </td>
      ))}
    </tr>
  );
};

const Table = <T,>({
  data,
  columns,
  selectable = false,
  searchable = false,
  pagination = false,
  itemsPerPage = 10,
  className,
  onRowSelect,
  onSort,
  loading = false,
  emptyMessage = "No data available",
  toolbarRight,
}: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = React.useState<T[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortColumn, setSortColumn] = React.useState<keyof T | undefined>(
    undefined
  );
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );

  const filteredData = React.useMemo(() => {
    let filtered = data;

    if (searchTerm) {
      filtered = data.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [data, searchTerm, sortColumn, sortDirection, columns]);

  const paginatedData = React.useMemo(() => {
    if (!pagination) return filteredData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage, pagination]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setSelectAll(false);
    } else {
      setSelectedRows(paginatedData);
      setSelectAll(true);
    }
  };

  const handleRowSelect = (row: T) => {
    setSelectedRows((prev) => {
      const isSelected = prev.includes(row);
      const newSelection = isSelected
        ? prev.filter((r) => r !== row)
        : [...prev, row];
      onRowSelect?.(newSelection);
      return newSelection;
    });
  };

  const handleSort = (column: keyof T, direction: "asc" | "desc") => {
    setSortColumn(column);
    setSortDirection(direction);
    onSort?.(column, direction);
  };

  React.useEffect(() => {
    if (
      selectedRows.length === paginatedData.length &&
      paginatedData.length > 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedRows, paginatedData]);

  if (loading) {
    return (
      <div
        className={cn(
          "rounded-lg border border-neutral-200 bg-neutral-50",
          className
        )}
      >
        <div className="p-8 text-center">
          <Typography variant="body-02" className="text-neutral-400">
            Loading...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-neutral-50",
        className
      )}
    >
      {searchable && (
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-3 py-3.5">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-text-primary min-w-72 rounded-md border border-neutral-200 bg-transparent px-2 py-1 text-[13px] placeholder:text-neutral-400 focus:outline-none"
            placeholder="Search..."
          />
          {toolbarRight && <div>{toolbarRight}</div>}
        </div>
      )}

      <div className="min-h-[245px] overflow-hidden rounded-md border border-neutral-200">
        <table className="w-full">
          <TableHeader
            columns={columns}
            selectable={selectable}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  row={row}
                  columns={columns}
                  index={index}
                  selectable={selectable}
                  selected={selectedRows.includes(row)}
                  onSelect={handleRowSelect}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center"
                >
                  <Typography variant="body-02" className="text-neutral-400">
                    {emptyMessage}
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="border-t border-neutral-200 px-3 py-3.5">
          <div className="flex items-center justify-between">
            <Typography variant="body-02" className="text-neutral-500">
              {selectedRows.length} of {filteredData.length} row(s) selected
            </Typography>
            <div className="flex items-center gap-3">
              <Button
                variant="navigation"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="text-text-primary size-4" />
              </Button>
              <div className="flex items-center gap-4">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant="pagination"
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        currentPage === page ? getPaginationActiveClasses() : ""
                      )}
                    >
                      <Typography variant="body-02">{page}</Typography>
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-text-primary text-sm">...</span>
                    <Button
                      variant="pagination"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      <Typography variant="body-02">{totalPages}</Typography>
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="navigation"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="text-text-primary size-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Table };
