'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { supportTickets, resolutionTrends, ticketsByCategory, satisfactionScores, sparkTickets, sparkResolved } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { aggregateByTimeRange, type TimeRange, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const priorityColors: Record<string, string> = { Critical: '#EF4444', High: '#F59E0B', Medium: '#3B82F6', Low: '#10B981' };
const statusColors: Record<string, string> = { Open: '#EF4444', 'In Progress': '#F59E0B', Resolved: '#10B981', Scheduled: '#3B82F6' };

type Ticket = typeof supportTickets[number];

const columns: Column<Ticket>[] = [
  { key: 'id', label: 'ID', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'title', label: 'Title', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700 max-w-[200px] truncate' },
  { key: 'priority', label: 'Priority', sortable: true, render: (t) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (priorityColors[t.priority] || '#999') + '15', color: priorityColors[t.priority] || '#999' }}>{t.priority}</span> },
  { key: 'status', label: 'Status', sortable: true, render: (t) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[t.status] || '#999') + '15', color: statusColors[t.status] || '#999' }}>{t.status}</span> },
  { key: 'assignee', label: 'Assignee', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'department', label: 'Department', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'category', label: 'Category', sortable: true, render: (t) => <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium">{t.category}</span> },
  { key: 'created', label: 'Created', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
];

export default function SupportPage() {
  const [filter, setFilter] = useState('All');
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
  const [department, setDepartment] = useState<Department>('All');

  const filtered = useMemo(() =>
    filter === 'All' ? supportTickets : supportTickets.filter(t => t.status === filter),
    [filter]
  );
  const satisfactionAgg = useMemo(() => aggregateByTimeRange(satisfactionScores, timeRange, 'month', 'avg'), [timeRange]);

  // Computed stats
  const open = supportTickets.filter(t => t.status === 'Open').length;
  const inProgress = supportTickets.filter(t => t.status === 'In Progress').length;
  const resolved = supportTickets.filter(t => t.status === 'Resolved').length;

  const sparkOpen = [3, 4, 2, 5, 3, 4, 2, 5, 3, 4, 3, 3];
  const sparkInProgress = [2, 3, 2, 2, 3, 2, 2, 3, 2, 2, 3, 2];

  const stats = [
    { label: 'Total Tickets', value: supportTickets.length.toString(), spark: sparkTickets, color: '#7C3AED' },
    { label: 'Open', value: open.toString(), spark: sparkOpen, color: '#EF4444' },
    { label: 'In Progress', value: inProgress.toString(), spark: sparkInProgress, color: '#F59E0B' },
    { label: 'Resolved', value: resolved.toString(), spark: sparkResolved, color: '#10B981' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Support & Tickets</h1>
        <p className="text-xs text-gray-400">Issue tracking, resolution trends, and satisfaction scores</p>
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
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                </div>
                <Sparkline data={s.spark} color={s.color} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Resolution Trends (Weekly)</h3>
            <div className="flex items-center gap-4 mb-3">
              {[{ label: 'Resolved', color: '#10B981' }, { label: 'Pending', color: '#F59E0B' }, { label: 'Escalated', color: '#EF4444' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={resolutionTrends} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="resolved" name="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="escalated" name="Escalated" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Satisfaction Score Trend</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={satisfactionAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[3.5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" name="Score" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4, fill: '#7C3AED' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Tickets by Category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {ticketsByCategory.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-gray-800">{c.count}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{c.category}</p>
                <div className="w-full h-1.5 rounded-full bg-gray-200 mt-2 overflow-hidden">
                  <div className="h-full rounded-full bg-purple-500" style={{ width: `${(c.resolved / c.count) * 100}%` }} />
                </div>
                <p className="text-[9px] text-gray-400 mt-1">{((c.resolved / c.count) * 100).toFixed(0)}% resolved</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Tickets Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Support Tickets</h3>
            <div className="flex gap-2">
              {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filter === f ? 'bg-purple-500 text-white border-purple-500' : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}>{f}</button>
              ))}
            </div>
          </div>
          <SortableTable columns={columns} data={filtered} rowKey={(t) => t.id} emptyMessage="No tickets found." />
        </div>
      </div>
    </>
  );
}
