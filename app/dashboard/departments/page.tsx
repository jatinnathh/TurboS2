'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { motion } from 'framer-motion';
import { departmentPerformance } from '../data';

export default function DepartmentsPage() {
  const radarData = departmentPerformance.map(d => ({ name: d.name, satisfaction: d.satisfaction, occupancy: d.occupancy, success: d.success }));

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Departments</h1>
        <p className="text-xs text-gray-400">Performance, workload, and resource utilization across departments</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Department Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentPerformance.slice(0, 4).map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="text-sm font-bold text-gray-700">{d.name}</h4>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-gray-400">Patients</span><span className="font-semibold text-gray-700">{d.patients.toLocaleString()}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400">Avg Wait</span><span className="font-semibold text-gray-700">{d.avgWait}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400">Satisfaction</span><span className="font-semibold text-emerald-500">{d.satisfaction}%</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">Occupancy</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${d.occupancy}%` }} />
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
              <BarChart data={departmentPerformance} layout="vertical" barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} width={90} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Radar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Department Performance Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
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
        </div>

        {/* Full Table */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Department Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Department', 'Patients', 'Avg Wait', 'Satisfaction', 'Revenue', 'Beds', 'Occupancy', 'Doctors', 'Success Rate'].map(h => (
                    <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {departmentPerformance.map((d, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{d.name}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{d.patients.toLocaleString()}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{d.avgWait}</td>
                    <td className="px-3 py-3"><span className={`text-xs font-semibold ${d.satisfaction >= 90 ? 'text-emerald-500' : 'text-amber-500'}`}>{d.satisfaction}%</span></td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">${(d.revenue / 1000000).toFixed(2)}M</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{d.beds}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2"><div className="w-16 h-2 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${d.occupancy}%`, background: d.occupancy > 85 ? '#EF4444' : '#7C3AED' }} /></div><span className="text-[10px] font-semibold">{d.occupancy}%</span></div>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-500">{d.doctors}</td>
                    <td className="px-3 py-3"><span className={`text-xs font-semibold ${d.success >= 95 ? 'text-emerald-500' : d.success >= 90 ? 'text-amber-500' : 'text-red-500'}`}>{d.success}%</span></td>
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
