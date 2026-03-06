'use client';

import { useState, useMemo } from 'react';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  /** Custom render function for the cell */
  render?: (row: T) => React.ReactNode;
  /** For sortable columns: extract a comparable value (defaults to row[key]) */
  sortValue?: (row: T) => string | number;
  /** Header class overrides */
  headerClassName?: string;
  /** Cell class overrides */
  cellClassName?: string;
}

interface SortableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  /** Optional: called when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Empty state message */
  emptyMessage?: string;
}

export default function SortableTable<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  onRowClick,
  emptyMessage = 'No data found.',
}: SortableTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find(c => c.key === sortKey);
    if (!col) return data;

    return [...data].sort((a, b) => {
      const aVal = col.sortValue ? col.sortValue(a) : a[sortKey];
      const bVal = col.sortValue ? col.sortValue(b) : b[sortKey];

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'desc' ? bVal - aVal : aVal - bVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return sortDir === 'desc'
        ? bStr.localeCompare(aStr)
        : aStr.localeCompare(bStr);
    });
  }, [data, sortKey, sortDir, columns]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map(col => (
              <th
                key={col.key}
                onClick={col.sortable ? () => toggleSort(col.key) : undefined}
                className={`px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400 ${
                  col.sortable ? 'cursor-pointer hover:text-gray-600 transition-colors select-none' : ''
                } ${col.headerClassName || ''}`}
              >
                {col.label}
                {col.sortable && (
                  <span className="ml-1 text-[8px]">
                    {sortKey === col.key
                      ? sortDir === 'desc' ? '▼' : '▲'
                      : '⇅'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-10 text-xs text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map(row => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
              >
                {columns.map(col => (
                  <td
                    key={col.key}
                    className={col.cellClassName || 'px-3 py-3 text-xs text-gray-500'}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
