'use client';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { staffList, staffByDepartment, shiftDistribution } from '../data';

const statusColors: Record<string, string> = { 'On Duty': '#10B981', 'Off Duty': '#6B7280', 'On Leave': '#F59E0B' };
const COLORS = ['#7C3AED', '#EC4899', '#3B82F6'];

export default function StaffPage() {
  const [search, setSearch] = useState('');
  const filtered = staffList.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.department.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Staff Management</h1>
        <p className="text-xs text-gray-400">Staff workload, shifts, and department allocation</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Staff', value: '485' },
            { label: 'On Duty Now', value: '342' },
            { label: 'On Leave', value: '28' },
            { label: 'Open Positions', value: '15' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff by Dept */}
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
          {/* Shift Distribution */}
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

        {/* Staff Table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Staff Directory</h3>
            <input type="text" placeholder="Search staff..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="text-sm px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-300 w-64" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['ID', 'Name', 'Role', 'Department', 'Shift', 'Status', 'Experience', 'Patients Today'].map(h => (
                    <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{s.id}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{s.name}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{s.role}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{s.department}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium">{s.shift}</span></td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[s.status] || '#999') + '15', color: statusColors[s.status] || '#999' }}>{s.status}</span></td>
                    <td className="px-3 py-3 text-xs text-gray-500">{s.experience}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{s.patientsToday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
