'use client';
import { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { ambulanceFleet, responseTimeData, dispatchByHour, sparkResponse, sparkDispatches } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { aggregateByTimeRange, type TimeRange, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const statusColors: Record<string, string> = { Available: '#10B981', 'On Route': '#3B82F6', 'At Scene': '#F59E0B', Maintenance: '#EF4444' };

type Ambulance = typeof ambulanceFleet[number];

const columns: Column<Ambulance>[] = [
  { key: 'id', label: 'Unit', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'type', label: 'Type', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'driver', label: 'Driver', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'status', label: 'Status', sortable: true, render: (a) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[a.status] || '#999') + '15', color: statusColors[a.status] || '#999' }}>{a.status}</span> },
  { key: 'location', label: 'Location', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'lastService', label: 'Last Service', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'mileage', label: 'Mileage', sortable: true, render: (a) => <span className="text-xs text-gray-600">{a.mileage.toLocaleString()} mi</span> },
];

export default function AmbulancePage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
  const [department, setDepartment] = useState<Department>('All');

  const responseAgg = useMemo(() => aggregateByTimeRange(responseTimeData, timeRange, 'month', 'avg'), [timeRange]);

  const active = ambulanceFleet.filter(a => a.status === 'On Route' || a.status === 'At Scene').length;
  const available = ambulanceFleet.filter(a => a.status === 'Available').length;
  // Computed avg response
  const avgResponse = (responseTimeData.reduce((sum, d) => sum + d.avgResponse, 0) / responseTimeData.length).toFixed(1);

  const sparkFleet = [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
  const sparkActive = [2, 3, 2, 4, 3, 2, 3, 4, 3, 2, 3, 2];
  const sparkAvailable = [2, 1, 2, 1, 2, 3, 2, 1, 2, 3, 2, 2];

  const stats = [
    { label: 'Total Fleet', value: ambulanceFleet.length.toString(), spark: sparkFleet, color: '#7C3AED' },
    { label: 'Active Now', value: active.toString(), spark: sparkActive, color: '#3B82F6' },
    { label: 'Available', value: available.toString(), spark: sparkAvailable, color: '#10B981' },
    { label: 'Avg Response', value: `${avgResponse} min`, spark: sparkResponse, color: '#F59E0B' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Ambulance Fleet</h1>
        <p className="text-xs text-gray-400">Fleet status, response times, and dispatch analytics</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="sticky top-[53px] z-20 bg-[#f8f9fc]/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-gray-100/50">
          <AnalyticsToolbar timeRange={timeRange} onTimeRangeChange={setTimeRange} department={department} onDepartmentChange={setDepartment} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Response Time vs Target (min)</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={responseAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[5, 12]} />
                <Tooltip />
                <Line type="monotone" dataKey="avgResponse" name="Avg Response" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#EF4444" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Dispatches by Hour</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dispatchByHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="dispatches" name="Dispatches" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Fleet Status</h3>
          <SortableTable columns={columns} data={ambulanceFleet} rowKey={(a) => a.id} />
        </div>
      </div>
    </>
  );
}
