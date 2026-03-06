'use client';
import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { patientsList, patientDemographics, admissionTrend } from '../data';

const statusColors: Record<string, string> = { Admitted: '#3B82F6', 'Under Treatment': '#F59E0B', Recovering: '#10B981', ICU: '#EF4444', Discharged: '#6B7280' };
const conditionColors: Record<string, string> = { Stable: '#10B981', Critical: '#EF4444', Moderate: '#F59E0B', Recovered: '#6B7280' };

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const filtered = patientsList.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Patient Management</h1>
        <p className="text-xs text-gray-400">Monitor patient admissions, demographics, and trends</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Patients', value: '12,345', change: '+65%', positive: true },
            { label: 'Currently Admitted', value: '847', change: '+12%', positive: true },
            { label: 'ICU Patients', value: '38', change: '+5', positive: false },
            { label: 'Discharged Today', value: '24', change: '+8%', positive: true },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              <span className={`text-xs font-semibold ${s.positive ? 'text-emerald-500' : 'text-red-500'}`}>{s.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admission vs Discharge Trend */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Admission vs Discharge Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={admissionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Line type="monotone" dataKey="admissions" name="Admissions" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="discharges" name="Discharges" stroke="#EC4899" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Demographics */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Patient Demographics</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={patientDemographics} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="ageGroup" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip />
                <Bar dataKey="male" name="Male" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="female" name="Female" fill="#EC4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Patient Records</h3>
            <input type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="text-sm px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-300 w-64" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['ID', 'Name', 'Age', 'Gender', 'Blood', 'Department', 'Doctor', 'Status', 'Condition'].map(h => (
                    <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{p.id}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{p.name}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.age}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.gender}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">{p.bloodType}</span></td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.department}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.doctor}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[p.status] || '#999') + '15', color: statusColors[p.status] || '#999' }}>{p.status}</span></td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (conditionColors[p.condition] || '#999') + '15', color: conditionColors[p.condition] || '#999' }}>{p.condition}</span></td>
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
