'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { hrMetrics, attendanceData, hiringPipeline, sparkPresent, sparkOnLeave, sparkOpenPos, sparkHiring } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { aggregateByTimeRange, type TimeRange, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

type HiringRow = typeof hiringPipeline[number];

const columns: Column<HiringRow>[] = [
  { key: 'role', label: 'Position', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'applicants', label: 'Applicants', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-600' },
  { key: 'shortlisted', label: 'Shortlisted', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-600' },
  { key: 'interviewed', label: 'Interviewed', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-600' },
  { key: 'offered', label: 'Offered', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-emerald-500' },
  { key: 'conversion', label: 'Conversion', sortable: true, sortValue: (h) => h.offered / h.applicants, render: (h) => <span className="text-xs font-semibold text-purple-500">{((h.offered / h.applicants) * 100).toFixed(1)}%</span> },
];

export default function HRPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
  const [department, setDepartment] = useState<Department>('All');

  const attendanceAgg = useMemo(() => aggregateByTimeRange(attendanceData, timeRange, 'month', 'avg'), [timeRange]);

  const stats = [
    { label: 'Total Employees', value: hrMetrics.totalEmployees.toString(), spark: sparkPresent, color: '#7C3AED' },
    { label: 'Active Today', value: hrMetrics.activeToday.toString(), spark: sparkHiring, color: '#10B981' },
    { label: 'On Leave', value: hrMetrics.onLeave.toString(), spark: sparkOnLeave, color: '#F59E0B' },
    { label: 'Open Positions', value: hrMetrics.openPositions.toString(), spark: sparkOpenPos, color: '#EF4444' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Human Resources</h1>
        <p className="text-xs text-gray-400">Attendance, hiring pipeline, and workforce analytics</p>
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
              <h3 className="text-lg font-bold text-gray-800">Attendance Rate (%)</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <div className="flex items-center gap-4 mb-3">
              {[{ label: 'Present', color: '#10B981' }, { label: 'Absent', color: '#EF4444' }, { label: 'Leave', color: '#F59E0B' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={attendanceAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="present" name="Present" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="absent" name="Absent" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="leave" name="Leave" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Hiring Pipeline</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={hiringPipeline} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="applicants" name="Applicants" fill="#7C3AED" radius={[2, 2, 0, 0]} />
                <Bar dataKey="shortlisted" name="Shortlisted" fill="#A78BFA" radius={[2, 2, 0, 0]} />
                <Bar dataKey="interviewed" name="Interviewed" fill="#EC4899" radius={[2, 2, 0, 0]} />
                <Bar dataKey="offered" name="Offered" fill="#10B981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hiring Pipeline Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Hiring Pipeline Details</h3>
          <SortableTable columns={columns} data={hiringPipeline} rowKey={(h) => h.role} />
        </div>
      </div>
    </>
  );
}
