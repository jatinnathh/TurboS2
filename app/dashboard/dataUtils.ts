// ══════════════════════════════════════════════════
// Data Utilities — Aggregation & Filtering
// ══════════════════════════════════════════════════

export type TimeRange = 'Monthly' | 'Quarterly' | 'Yearly';

export const DEPARTMENTS = [
  'All', 'Emergency', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'ICU',
] as const;

export type Department = (typeof DEPARTMENTS)[number];

const QUARTER_MAP: Record<string, string> = {
  Jan: 'Q1', Feb: 'Q1', Mar: 'Q1',
  Apr: 'Q2', May: 'Q2', Jun: 'Q2',
  Jul: 'Q3', Aug: 'Q3', Sep: 'Q3',
  Oct: 'Q4', Nov: 'Q4', Dec: 'Q4',
};

/**
 * Aggregate monthly data into quarterly buckets.
 * Sums numeric keys; uses the quarter label (Q1-Q4) as the dataKey.
 */
export function aggregateQuarterly<T extends Record<string, any>>(
  data: T[],
  monthKey: string = 'month',
  mode: 'sum' | 'avg' = 'sum',
): T[] {
  const quarterGroups: Record<string, { items: T[]; totals: Record<string, number> }> = {};

  for (const row of data) {
    const q = QUARTER_MAP[row[monthKey] as string] || 'Q1';
    if (!quarterGroups[q]) quarterGroups[q] = { items: [], totals: {} };
    quarterGroups[q].items.push(row);

    for (const [key, val] of Object.entries(row)) {
      if (key === monthKey) continue;
      if (typeof val === 'number') {
        quarterGroups[q].totals[key] = (quarterGroups[q].totals[key] || 0) + val;
      }
    }
  }

  return ['Q1', 'Q2', 'Q3', 'Q4']
    .filter(q => quarterGroups[q])
    .map(q => {
      const group = quarterGroups[q];
      const result: Record<string, any> = { [monthKey]: q };
      for (const [key, total] of Object.entries(group.totals)) {
        result[key] = mode === 'avg' ? Math.round((total / group.items.length) * 10) / 10 : Math.round(total);
      }
      return result as T;
    });
}

/**
 * Aggregate monthly data into a single yearly total.
 */
export function aggregateYearly<T extends Record<string, any>>(
  data: T[],
  monthKey: string = 'month',
  mode: 'sum' | 'avg' = 'sum',
): T[] {
  const totals: Record<string, number> = {};
  for (const row of data) {
    for (const [key, val] of Object.entries(row)) {
      if (key === monthKey) continue;
      if (typeof val === 'number') {
        totals[key] = (totals[key] || 0) + val;
      }
    }
  }

  const result: Record<string, any> = { [monthKey]: '2024' };
  for (const [key, total] of Object.entries(totals)) {
    result[key] = mode === 'avg' ? Math.round((total / data.length) * 10) / 10 : Math.round(total);
  }
  return [result as T];
}

/**
 * Apply time-range aggregation to monthly data.
 */
export function aggregateByTimeRange<T extends Record<string, any>>(
  data: T[],
  timeRange: TimeRange,
  monthKey: string = 'month',
  mode: 'sum' | 'avg' = 'sum',
): T[] {
  switch (timeRange) {
    case 'Quarterly': return aggregateQuarterly(data, monthKey, mode);
    case 'Yearly': return aggregateYearly(data, monthKey, mode);
    default: return data;
  }
}

/**
 * Filter array items by a department field.
 */
export function filterByDepartment<T extends Record<string, any>>(
  data: T[],
  department: Department,
  deptKey: string = 'department',
): T[] {
  if (department === 'All') return data;
  return data.filter(row => {
    const val = row[deptKey];
    if (typeof val === 'string') {
      return val.toLowerCase() === department.toLowerCase();
    }
    return true;
  });
}

/**
 * Sort doctors by a numeric field and return top N / bottom N.
 */
export function rankDoctors<T extends Record<string, any>>(
  data: T[],
  rankBy: string = 'utilization',
  order: 'top' | 'bottom' = 'top',
  limit: number = 5,
): T[] {
  const sorted = [...data].sort((a, b) =>
    order === 'top' ? b[rankBy] - a[rankBy] : a[rankBy] - b[rankBy]
  );
  return sorted.slice(0, limit);
}
