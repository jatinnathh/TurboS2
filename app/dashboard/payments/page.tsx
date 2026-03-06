'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { paymentRecords, revenueByDepartment, monthlyRevenue, sparkRevenue, sparkPatients, sparkBedOccupancy } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { aggregateByTimeRange, filterByDepartment, type TimeRange, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const statusColors: Record<string, string> = { Paid: '#10B981', Partial: '#F59E0B', Pending: '#EF4444' };

type PaymentRecord = typeof paymentRecords[number];

const columns: Column<PaymentRecord>[] = [
  { key: 'id', label: 'Invoice', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'patient', label: 'Patient', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'department', label: 'Department', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'amount', label: 'Amount', sortable: true, render: (p) => <span className="text-xs font-semibold text-gray-700">${p.amount.toLocaleString()}</span> },
  { key: 'paid', label: 'Paid', sortable: true, render: (p) => <span className="text-xs text-gray-500">${p.paid.toLocaleString()}</span> },
  { key: 'status', label: 'Status', sortable: true, render: (p) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[p.status] || '#999') + '15', color: statusColors[p.status] || '#999' }}>{p.status}</span> },
  { key: 'date', label: 'Date', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'method', label: 'Method', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
];

export default function PaymentsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
  const [department, setDepartment] = useState<Department>('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const deptFilteredRecords = useMemo(() => filterByDepartment(paymentRecords, department, 'department'), [department]);
  const finalRecords = useMemo(() =>
    statusFilter === 'All' ? deptFilteredRecords : deptFilteredRecords.filter(p => p.status === statusFilter),
    [deptFilteredRecords, statusFilter]
  );

  // Statistics
  const stats = useMemo(() => {
    const amounts = deptFilteredRecords.map(r => r.amount);
    if (amounts.length === 0) return { avg: 0, median: 0, mode: 0, total: 0, collected: 0 };
    const total = amounts.reduce((a, b) => a + b, 0);
    const avg = total / amounts.length;
    const sorted = [...amounts].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    const freq: Record<number, number> = {};
    amounts.forEach(v => freq[v] = (freq[v] || 0) + 1);
    let maxFreq = 0;
    let mode = amounts[0];
    for (const [val, f] of Object.entries(freq)) {
      if (f > maxFreq) { maxFreq = f; mode = Number(val); }
    }
    const collected = deptFilteredRecords.reduce((sum, r) => sum + r.paid, 0);
    return { avg, median, mode, total, collected };
  }, [deptFilteredRecords]);

  const outstanding = stats.total - stats.collected;
  const revenueAgg = useMemo(() => aggregateByTimeRange(monthlyRevenue, timeRange, 'month'), [timeRange]);
  const deptRevenueAgg = useMemo(() => {
    if (department === 'All') return revenueByDepartment;
    return revenueByDepartment.filter(d => d.department.toLowerCase() === department.toLowerCase());
  }, [department]);

  const sparkCollected = [15200, 12800, 8500, 18700, 40000, 20000, 15200, 12800, 8500, 18700, 40000, 20000];
  const sparkOutstanding = [0, 8500, 0, 0, 22000, 45000, 0, 8500, 0, 0, 22000, 45000];

  const statCards = [
    { label: 'Total Billed', value: `$${(stats.total / 1000).toFixed(1)}k`, color: '#7C3AED', spark: sparkRevenue },
    { label: 'Collected', value: `$${(stats.collected / 1000).toFixed(1)}k`, color: '#10B981', spark: sparkCollected },
    { label: 'Outstanding', value: `$${(outstanding / 1000).toFixed(1)}k`, color: '#EF4444', spark: sparkOutstanding },
    { label: 'Collection Rate', value: `${stats.total > 0 ? ((stats.collected / stats.total) * 100).toFixed(0) : 0}%`, color: '#3B82F6', spark: sparkBedOccupancy },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Payments & Billing</h1>
        <p className="text-xs text-gray-400">Revenue tracking, billing status, and financial analytics</p>
      </header>

      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="sticky top-[53px] z-20 bg-[#f8f9fc]/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-gray-100/50">
          <AnalyticsToolbar timeRange={timeRange} onTimeRangeChange={setTimeRange} department={department} onDepartmentChange={setDepartment} />
        </div>

        {/* Primary Stats with Sparklines */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistical Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Average Bill (Mean)', value: `$${stats.avg.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: 'avg' },
            { label: 'Median Bill', value: `$${stats.median.toLocaleString()}`, icon: 'median' },
            { label: 'Most Frequent (Mode)', value: `$${stats.mode.toLocaleString()}`, icon: 'mode' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">{s.label}</p>
                <p className="text-xl font-bold text-gray-800">{s.value}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                {s.icon === 'avg' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20v-8m0 0V4m0 8h8m-8 0H4"/></svg>}
                {s.icon === 'median' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>}
                {s.icon === 'mode' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2"/></svg>}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Revenue Trends</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EC4899" fill="#EC4899" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Department Revenue</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={deptRevenueAgg} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={85} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Records Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-gray-800">Payment Records</h3>
            <div className="flex gap-2">
              {['All', 'Paid', 'Partial', 'Pending'].map(f => (
                <button key={f} onClick={() => setStatusFilter(f)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${statusFilter === f ? 'bg-purple-500 text-white border-purple-500' : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}>{f}</button>
              ))}
            </div>
          </div>
          <SortableTable columns={columns} data={finalRecords} rowKey={(p) => p.id} emptyMessage="No records found matching filters." />
        </div>
      </div>
    </>
  );
}
