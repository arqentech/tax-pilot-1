import React from "react";

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
  emptyStateClassName?: string;
  emptyStateTextClassName?: string;
  tableClassName?: string;
  headerRowClassName?: string;
  bodyRowClassName?: string;
  getRowKey: (item: T) => string | number;
}

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "No data available",
  emptyStateClassName,
  emptyStateTextClassName,
  tableClassName = "",
  headerRowClassName = "",
  bodyRowClassName = "",
  getRowKey,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`w-full py-12 text-center ${emptyStateClassName || ""}`}>
        <p className={emptyStateTextClassName || "text-[#9D9E98] text-lg"}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[16px] overflow-hidden">
      <table
        className={`w-full border border-[#E6E6E1] rounded-[16px] overflow-hidden ${tableClassName}`}
      >
        <thead>
          <tr className={`border border-[#F0F0ED] bg-[#F6F6F3] ${headerRowClassName}`} style={{ height: "54px" }}>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`text-left py-4 px-4 text-[18px] text-[#9D9E98] font-medium ${column.headerClassName || ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={getRowKey(item)}
              className={`border-b border-[#E6E6E1] hover:bg-[#FBFBFA] transition-colors ${bodyRowClassName}`}
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className={`py-4 px-4 text-[18px] text-[#5F6057] ${column.cellClassName || ""}`}
                >
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
