'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { staffList, staffByDepartment, shiftDistribution, sparkOnDuty, sparkOnLeave, sparkOpenPos, sparkPatients } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { filterByDepartment, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const statusColors: Record<string, string> = { 'On Duty': '#10B981', 'Off Duty': '#6B7280', 'On Leave': '#F59E0B' };
const COLORS = ['#7C3AED', '#EC4899', '#3B82F6'];

type Staff = typeof staffList[number];

const columns: Column<Staff>[] = [
  { key: 'id', label: 'ID', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'name', label: 'Name', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'role', label: 'Role', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'department', label: 'Department', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'shift', label: 'Shift', sortable: true, render: (s) => <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium">{s.shift}</span> },
  { key: 'status', label: 'Status', sortable: true, render: (s) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[s.status] || '#999') + '15', color: statusColors[s.status] || '#999' }}>{s.status}</span> },
  { key: 'experience', label: 'Experience', sortable: true, sortValue: (s) => parseInt(s.experience), cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'patientsToday', label: 'Patients Today', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
];

export default function StaffPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<Department>('All');
  const [timeRange, setTimeRange] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  const deptFiltered = useMemo(() => filterByDepartment(staffList, department, 'department'), [department]);
  const filtered = useMemo(() =>
    deptFiltered.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase())),
    [deptFiltered, search]
  );

  // Computed stats
  const totalStaff = deptFiltered.length;
  const onDuty = deptFiltered.filter(s => s.status === 'On Duty').length;
  const onLeave = deptFiltered.filter(s => s.status === 'On Leave').length;
  const offDuty = deptFiltered.filter(s => s.status === 'Off Duty').length;

  const stats = [
    { label: 'Total Staff', value: totalStaff.toString(), spark: sparkPatients, color: '#7C3AED' },
    { label: 'On Duty Now', value: onDuty.toString(), spark: sparkOnDuty, color: '#10B981' },
    { label: 'On Leave', value: onLeave.toString(), spark: sparkOnLeave, color: '#F59E0B' },
    { label: 'Off Duty', value: offDuty.toString(), spark: sparkOpenPos, color: '#6B7280' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
        <p className="text-xs text-gray-400">Staff workload, shifts, and department allocation</p>
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">Staff by Department</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={staffByDepartment} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="doctors" name="Doctors" fill="#7C3AED" radius={[2, 2, 0, 0]} />
                <Bar dataKey="nurses" name="Nurses" fill="#EC4899" radius={[2, 2, 0, 0]} />
                <Bar dataKey="technicians" name="Technicians" fill="#A78BFA" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Shift Distribution</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={shiftDistribution} cx="50%" cy="50%" outerRadius={100} innerRadius={55} dataKey="count" nameKey="shift" label={(props: any) => `${props.shift.split(' ')[0]}: ${props.count}`}>
                    {shiftDistribution.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Staff Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Staff Directory</h3>
            <input type="text" placeholder="Search staff..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="text-sm px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-300 w-64" />
          </div>
          <SortableTable columns={columns} data={filtered} rowKey={(s) => s.id} emptyMessage="No staff found." />
        </div>
      </div>
    </>
  );
}
