'use client';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { ambulanceFleet, responseTimeData, dispatchByHour } from '../data';

const statusColors: Record<string, string> = { Available: '#10B981', 'On Route': '#3B82F6', 'At Scene': '#F59E0B', Maintenance: '#EF4444' };

export default function AmbulancePage() {
  const active = ambulanceFleet.filter(a => a.status === 'On Route' || a.status === 'At Scene').length;
  const available = ambulanceFleet.filter(a => a.status === 'Available').length;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Ambulance Fleet</h1>
        <p className="text-xs text-gray-400">Fleet status, response times, and dispatch analytics</p>
      </header>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Fleet', value: ambulanceFleet.length.toString() },
            { label: 'Active Now', value: active.toString() },
            { label: 'Available', value: available.toString() },
            { label: 'Avg Response', value: '8.3 min' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Response Time vs Target (min)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={responseTimeData}>
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

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Fleet Status</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100">
                {['Unit', 'Type', 'Driver', 'Status', 'Location', 'Last Service', 'Mileage'].map(h => (
                  <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                ))}</tr></thead>
              <tbody>
                {ambulanceFleet.map(a => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{a.id}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{a.type}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{a.driver}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[a.status] || '#999') + '15', color: statusColors[a.status] || '#999' }}>{a.status}</span></td>
                    <td className="px-3 py-3 text-xs text-gray-500">{a.location}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{a.lastService}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{a.mileage.toLocaleString()} mi</td>
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
