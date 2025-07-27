import * as React from "react";
import { cn } from "@/lib/utils";
import Typography from "./typography";
import { ChevronsUpDown } from "lucide-react";

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
  className?: string;
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (column: keyof T, direction: "asc" | "desc") => void;
  loading?: boolean;
  emptyMessage?: string;
  toolbarRight?: React.ReactNode;
  getRowId?: (row: T, index: number) => string | number;
}

export interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  selectable?: boolean;
  selectAll?: boolean;
  indeterminate?: boolean;
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
  indeterminate,
  onSelectAll,
  onSort,
  sortColumn,
  sortDirection,
}: TableHeaderProps<T>) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  // Set indeterminate state on the checkbox
  React.useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

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
              ref={checkboxRef}
              type="checkbox"
              checked={selectAll && !indeterminate}
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
  className,
  onRowSelect,
  onSort,
  loading = false,
  emptyMessage = "No data available",
  toolbarRight,
  getRowId,
}: TableProps<T>) => {
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Set<string | number>
  >(new Set());
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortColumn, setSortColumn] = React.useState<keyof T | undefined>(
    undefined
  );
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );

  const defaultGetRowId = React.useCallback(
    (row: T, index: number): string | number => {
      // Try to use 'id' property if it exists, otherwise use index
      if (row && typeof row === "object" && "id" in row) {
        return (row as { id: string | number }).id;
      }
      return index;
    },
    []
  );

  const getRowIdFn = getRowId || defaultGetRowId;

  const processedData = React.useMemo(() => {
    let processed = data;

    if (searchTerm) {
      processed = data.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
    }

    if (sortColumn) {
      processed = [...processed].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return processed;
  }, [data, searchTerm, sortColumn, sortDirection, columns]);

  // Get currently selected rows from the original data
  const selectedRows = React.useMemo(() => {
    return data.filter((row, index) =>
      selectedRowIds.has(getRowIdFn(row, index))
    );
  }, [data, selectedRowIds, getRowIdFn]);

  // Check selection state for header checkbox
  const selectionState = React.useMemo(() => {
    if (processedData.length === 0) {
      return { allSelected: false, indeterminate: false };
    }

    // Check if ALL processed rows are selected by checking each one individually
    const allProcessedSelected = processedData.every((row) => {
      const originalIndex = data.findIndex(
        (originalRow) => originalRow === row
      );
      const rowId = getRowIdFn(row, originalIndex);
      return selectedRowIds.has(rowId);
    });

    // Check if SOME processed rows are selected
    const someProcessedSelected = processedData.some((row) => {
      const originalIndex = data.findIndex(
        (originalRow) => originalRow === row
      );
      const rowId = getRowIdFn(row, originalIndex);
      return selectedRowIds.has(rowId);
    });

    if (allProcessedSelected) {
      return { allSelected: true, indeterminate: false };
    } else if (someProcessedSelected) {
      return { allSelected: false, indeterminate: true };
    } else {
      return { allSelected: false, indeterminate: false };
    }
  }, [processedData, selectedRowIds, getRowIdFn, data]);

  const handleSelectAll = () => {
    // Get all row IDs from the current processed dataset
    const allProcessedRowIds = processedData.map((row) => {
      const originalIndex = data.findIndex(
        (originalRow) => originalRow === row
      );
      return getRowIdFn(row, originalIndex);
    });

    if (selectionState.allSelected) {
      // If all processed rows are selected, deselect all processed rows
      setSelectedRowIds((prev) => {
        const newSet = new Set(prev);
        allProcessedRowIds.forEach((id) => newSet.delete(id));
        return newSet;
      });
    } else {
      // Select all rows in the current processed dataset
      setSelectedRowIds((prev) => {
        const newSet = new Set(prev);
        allProcessedRowIds.forEach((id) => newSet.add(id));
        return newSet;
      });
    }
  };

  const handleRowSelect = (row: T) => {
    // Find the original index in the data array for consistent row IDs
    const originalIndex = data.findIndex((originalRow) => originalRow === row);
    const rowId = getRowIdFn(row, originalIndex);

    setSelectedRowIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const handleSort = (column: keyof T, direction: "asc" | "desc") => {
    setSortColumn(column);
    setSortDirection(direction);
    onSort?.(column, direction);
  };

  // Notify parent when selection changes
  const previousSelectedRowsRef = React.useRef<T[]>([]);
  React.useEffect(() => {
    // Only notify if the actual selection changed
    if (
      JSON.stringify(previousSelectedRowsRef.current) !==
      JSON.stringify(selectedRows)
    ) {
      onRowSelect?.(selectedRows);
      previousSelectedRowsRef.current = selectedRows;
    }
  }, [selectedRows, onRowSelect]);

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

      <div className="scrollbar-thin min-h-[245px] overflow-x-auto overflow-y-hidden rounded-md border border-neutral-200">
        <table className="w-full min-w-max whitespace-nowrap">
          <TableHeader
            columns={columns}
            selectable={selectable}
            selectAll={selectionState.allSelected}
            indeterminate={selectionState.indeterminate}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
          <tbody>
            {processedData.length > 0 ? (
              processedData.map((row, index) => {
                // Find the original index in the data array for consistent row IDs
                const originalIndex = data.findIndex(
                  (originalRow) => originalRow === row
                );
                const rowId = getRowIdFn(row, originalIndex);
                return (
                  <TableRow
                    key={rowId}
                    row={row}
                    columns={columns}
                    index={index}
                    selectable={selectable}
                    selected={selectedRowIds.has(rowId)}
                    onSelect={handleRowSelect}
                  />
                );
              })
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
    </div>
  );
};

export { Table };
