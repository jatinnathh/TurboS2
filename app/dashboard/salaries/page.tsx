'use client';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { salaryByRole, payrollMonthly } from '../data';

export default function SalariesPage() {
  const totalPayroll = payrollMonthly.reduce((sum, m) => sum + m.totalPayroll, 0);
  const totalBonuses = payrollMonthly.reduce((sum, m) => sum + m.bonuses, 0);
  const totalOvertime = payrollMonthly.reduce((sum, m) => sum + m.overtime, 0);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Salaries & Payroll</h1>
        <p className="text-xs text-gray-400">Payroll tracking, salary distribution, and compensation analysis</p>
      </header>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Annual Payroll', value: `$${(totalPayroll / 1000000).toFixed(1)}M` },
            { label: 'Monthly Avg', value: `$${(totalPayroll / 12 / 1000000).toFixed(2)}M` },
            { label: 'Total Bonuses', value: `$${(totalBonuses / 1000).toFixed(0)}k` },
            { label: 'Overtime Cost', value: `$${(totalOvertime / 1000000).toFixed(2)}M` },
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
            <h3 className="text-lg font-bold text-gray-800 mb-4">Monthly Payroll Trend</h3>
            <div className="flex items-center gap-4 mb-3">
              {[{ label: 'Base Payroll', color: '#7C3AED' }, { label: 'Bonuses', color: '#10B981' }, { label: 'Overtime', color: '#F59E0B' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={payrollMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000000).toFixed(1)}M`} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`]} />
                <Line type="monotone" dataKey="totalPayroll" name="Base Payroll" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="bonuses" name="Bonuses" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="overtime" name="Overtime" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Average Salary by Role</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salaryByRole} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="role" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={110} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`]} />
                <Bar dataKey="avgSalary" name="Avg Salary" fill="#7C3AED" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Salary Ranges by Role</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100">
                {['Role', 'Headcount', 'Min Salary', 'Avg Salary', 'Max Salary', 'Range Spread'].map(h => (
                  <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                ))}</tr></thead>
              <tbody>
                {salaryByRole.map((s, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{s.role}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{s.count}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">${s.min.toLocaleString()}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-purple-500">${s.avgSalary.toLocaleString()}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">${s.max.toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2"><div className="w-20 h-2 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full bg-purple-400" style={{ width: `${((s.max - s.min) / s.max) * 100}%` }} /></div><span className="text-[10px] text-gray-500">${((s.max - s.min) / 1000).toFixed(0)}k</span></div>
                    </td>
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
