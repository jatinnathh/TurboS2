'use client';

import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { departmentPerformance } from '../data';
import { DEPARTMENTS, type Department } from '../dataUtils';

const PIE_COLORS = ['#7C3AED', '#EC4899', '#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

export default function DepartmentsPage() {
  const [selectedDept, setSelectedDept] = useState<Department>('All');
  const [sortBy, setSortBy] = useState<'patients' | 'satisfaction' | 'revenue' | 'occupancy' | 'success'>('patients');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filteredData = useMemo(() => {
    let data = selectedDept === 'All'
      ? [...departmentPerformance]
      : departmentPerformance.filter(d => d.name === selectedDept);
    data.sort((a, b) => sortDir === 'desc' ? (b as any)[sortBy] - (a as any)[sortBy] : (a as any)[sortBy] - (b as any)[sortBy]);
    return data;
  }, [selectedDept, sortBy, sortDir]);

  const radarData = useMemo(
    () => filteredData.map(d => ({ name: d.name, satisfaction: d.satisfaction, occupancy: d.occupancy, success: d.success })),
    [filteredData],
  );

  const revenuePie = useMemo(
    () => filteredData.map(d => ({ name: d.name, value: d.revenue })),
    [filteredData],
  );

  const toggleSort = (key: typeof sortBy) => {
    if (sortBy === key) setSortDir(prev => prev === 'desc' ? 'asc' : 'desc');
    else { setSortBy(key); setSortDir('desc'); }
  };

  const SortIcon = ({ field }: { field: typeof sortBy }) => (
    <span className="ml-1 text-[8px]">
      {sortBy === field ? (sortDir === 'desc' ? '▼' : '▲') : '⇅'}
    </span>
  );

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Departments</h1>
        <p className="text-xs text-gray-400">Performance, workload, and resource utilization across departments</p>
      </header>
      <div className="p-6 space-y-6">

        {/* ── Controls ── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5 flex-wrap">
            {DEPARTMENTS.map(dept => {
              const isActive = dept === selectedDept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className="relative z-10 px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-colors duration-200"
                  style={{ color: isActive ? '#fff' : '#6b7280' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="deptTabIndicator"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{dept === 'All' ? 'All' : dept}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.slice(0, 4).map((d, i) => (
            <motion.div key={d.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-sm font-bold text-gray-700">{d.name}</h4>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-gray-400">Patients</span><span className="font-semibold text-gray-700">{d.patients.toLocaleString()}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400">Avg Wait</span><span className="font-semibold text-gray-700">{d.avgWait}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400">Satisfaction</span><span className="font-semibold text-emerald-500">{d.satisfaction}%</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">Occupancy</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.occupancy}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ background: d.occupancy > 85 ? '#EF4444' : '#7C3AED' }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-600">{d.occupancy}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Dept */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue by Department</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} width={90} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Pie Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={revenuePie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={55} paddingAngle={3} strokeWidth={0}
                  label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {revenuePie.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Department Performance Radar</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <Radar name="Satisfaction" dataKey="satisfaction" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Occupancy" dataKey="occupancy" stroke="#EC4899" fill="#EC4899" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Success Rate" dataKey="success" stroke="#10B981" fill="#10B981" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Full Table with sortable columns */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Department Overview</h3>
            <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">
              Sorted by {sortBy} ({sortDir === 'desc' ? 'High → Low' : 'Low → High'})
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">Department</th>
                  {[
                    { key: 'patients' as const, label: 'Patients' },
                    { key: 'satisfaction' as const, label: 'Satisfaction' },
                    { key: 'revenue' as const, label: 'Revenue' },
                    { key: 'occupancy' as const, label: 'Occupancy' },
                    { key: 'success' as const, label: 'Success Rate' },
                  ].map(col => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400 cursor-pointer hover:text-gray-600 transition-colors select-none"
                    >
                      {col.label}<SortIcon field={col.key} />
                    </th>
                  ))}
                  <th className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">Avg Wait</th>
                  <th className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">Beds</th>
                  <th className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">Doctors</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((d, i) => (
                  <motion.tr key={d.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{d.name}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{d.patients.toLocaleString()}</td>
                    <td className="px-3 py-3"><span className={`text-xs font-semibold ${d.satisfaction >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{d.satisfaction}%</span></td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">${(d.revenue / 1000000).toFixed(2)}M</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2"><div className="w-16 h-2 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${d.occupancy}%`, background: d.occupancy > 85 ? '#EF4444' : '#7C3AED' }} /></div><span className="text-[10px] font-semibold">{d.occupancy}%</span></div>
                    </td>
                    <td className="px-3 py-3"><span className={`text-xs font-semibold ${d.success >= 95 ? 'text-emerald-500' : d.success >= 90 ? 'text-amber-500' : 'text-red-500'}`}>{d.success}%</span></td>
                    <td className="px-3 py-3 text-xs text-gray-500">{d.avgWait}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{d.beds}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{d.doctors}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
