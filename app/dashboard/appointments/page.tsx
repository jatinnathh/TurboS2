'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { appointmentsList, appointmentsByType, appointmentTrend, sparkAppointments, sparkCompleted, sparkCancelled } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { filterByDepartment, aggregateByTimeRange, type TimeRange, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const statusColors: Record<string, string> = { Confirmed: '#10B981', Pending: '#F59E0B', 'In Progress': '#3B82F6', Scheduled: '#7C3AED' };
const COLORS = ['#7C3AED', '#EC4899', '#FF2D55', '#F59E0B', '#3B82F6', '#10B981'];

type Appointment = typeof appointmentsList[number];

const columns: Column<Appointment>[] = [
  { key: 'id', label: 'ID', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'patient', label: 'Patient', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'doctor', label: 'Doctor', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'department', label: 'Department', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'date', label: 'Date', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'time', label: 'Time', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'type', label: 'Type', sortable: true, render: (a) => <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium">{a.type}</span> },
  { key: 'status', label: 'Status', sortable: true, render: (a) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[a.status] || '#999') + '15', color: statusColors[a.status] || '#999' }}>{a.status}</span> },
];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState('All');
  const [department, setDepartment] = useState<Department>('All');
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');

  const deptFiltered = useMemo(() => filterByDepartment(appointmentsList, department, 'department'), [department]);
  const filtered = useMemo(() =>
    filter === 'All' ? deptFiltered : deptFiltered.filter(a => a.status === filter),
    [deptFiltered, filter]
  );

  const trendAgg = useMemo(() => aggregateByTimeRange(appointmentTrend, timeRange, 'month'), [timeRange]);

  // Computed stats
  const total = deptFiltered.length;
  const confirmed = deptFiltered.filter(a => a.status === 'Confirmed').length;
  const pending = deptFiltered.filter(a => a.status === 'Pending' || a.status === 'Scheduled').length;
  const inProgress = deptFiltered.filter(a => a.status === 'In Progress').length;

  const sparkPending = [42, 38, 45, 40, 48, 35, 42, 50, 44, 40, 38, 42];
  const stats = [
    { label: 'Total Appointments', value: total.toString(), spark: sparkAppointments, color: '#7C3AED' },
    { label: 'Confirmed', value: confirmed.toString(), spark: sparkCompleted, color: '#10B981' },
    { label: 'Pending', value: pending.toString(), spark: sparkPending, color: '#F59E0B' },
    { label: 'In Progress', value: inProgress.toString(), spark: sparkCancelled, color: '#3B82F6' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Appointments</h1>
        <p className="text-xs text-gray-400">Track scheduling, completion rates, and appointment types</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="sticky top-[53px] z-20 bg-[#f8f9fc]/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-gray-100/50">
          <AnalyticsToolbar timeRange={timeRange} onTimeRangeChange={setTimeRange} department={department} onDepartmentChange={setDepartment} />
        </div>

        {/* Stats with Sparklines */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Appointment Trend</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              {[{ label: 'Scheduled', color: '#7C3AED' }, { label: 'Completed', color: '#10B981' }, { label: 'Cancelled', color: '#EF4444' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Line type="monotone" dataKey="scheduled" name="Scheduled" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="completed" name="Completed" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Appointments by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={appointmentsByType} cx="50%" cy="50%" outerRadius={100} innerRadius={50} dataKey="count" nameKey="type" label={(props: any) => `${props.type}: ${props.count}`}>
                  {appointmentsByType.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
            <div className="flex gap-2">
              {['All', 'Confirmed', 'Pending', 'Scheduled'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filter === f ? 'bg-purple-500 text-white border-purple-500' : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}>{f}</button>
              ))}
            </div>
          </div>
          <SortableTable columns={columns} data={filtered} rowKey={(a) => a.id} emptyMessage="No appointments found." />
        </div>
      </div>
    </>
  );
}
