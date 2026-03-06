'use client';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { hrMetrics, attendanceData, hiringPipeline } from '../data';

export default function HRPage() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Human Resources</h1>
        <p className="text-xs text-gray-400">Attendance, hiring pipeline, and workforce analytics</p>
      </header>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Employees', value: hrMetrics.totalEmployees.toString() },
            { label: 'Active Today', value: hrMetrics.activeToday.toString() },
            { label: 'On Leave', value: hrMetrics.onLeave.toString() },
            { label: 'Open Positions', value: hrMetrics.openPositions.toString() },
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">Attendance Rate (%)</h3>
            <div className="flex items-center gap-4 mb-3">
              {[{ label: 'Present', color: '#10B981' }, { label: 'Absent', color: '#EF4444' }, { label: 'Leave', color: '#F59E0B' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={attendanceData}>
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

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Hiring Pipeline Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100">
                {['Position', 'Applicants', 'Shortlisted', 'Interviewed', 'Offered', 'Conversion'].map(h => (
                  <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                ))}</tr></thead>
              <tbody>
                {hiringPipeline.map((h, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{h.role}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{h.applicants}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{h.shortlisted}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{h.interviewed}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-emerald-500">{h.offered}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-purple-500">{((h.offered / h.applicants) * 100).toFixed(1)}%</td>
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
