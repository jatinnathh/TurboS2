'use client';
import { useState } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { paymentRecords, revenueByDepartment, monthlyRevenue } from '../data';

const statusColors: Record<string, string> = { Paid: '#10B981', Partial: '#F59E0B', Pending: '#EF4444' };

export default function PaymentsPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? paymentRecords : paymentRecords.filter(p => p.status === filter);
  const totalRevenue = paymentRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalCollected = paymentRecords.reduce((sum, r) => sum + r.paid, 0);
  const outstanding = totalRevenue - totalCollected;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Payments & Billing</h1>
        <p className="text-xs text-gray-400">Revenue tracking, billing status, and financial analytics</p>
      </header>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Billed', value: `$${(totalRevenue / 1000).toFixed(0)}k`, color: '#7C3AED' },
            { label: 'Collected', value: `$${(totalCollected / 1000).toFixed(0)}k`, color: '#10B981' },
            { label: 'Outstanding', value: `$${(outstanding / 1000).toFixed(0)}k`, color: '#EF4444' },
            { label: 'Collection Rate', value: `${((totalCollected / totalRevenue) * 100).toFixed(0)}%`, color: '#3B82F6' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue vs Expenses</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.15} strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EC4899" fill="#EC4899" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue by Department</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueByDepartment} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} width={85} />
                <Tooltip formatter={(v: any) => [`$${Number(v).toLocaleString()}`, 'Revenue']} />
                <Bar dataKey="revenue" fill="#7C3AED" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Payment Records</h3>
            <div className="flex gap-2">
              {['All', 'Paid', 'Partial', 'Pending'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`text-xs px-3 py-1.5 rounded-full border transition-all ${filter === f ? 'bg-purple-500 text-white border-purple-500' : 'border-gray-200 text-gray-500 hover:border-purple-300'}`}>{f}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100">
                {['Invoice', 'Patient', 'Department', 'Amount', 'Paid', 'Status', 'Date', 'Method'].map(h => (
                  <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                ))}</tr></thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{p.id}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{p.patient}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.department}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">${p.amount.toLocaleString()}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">${p.paid.toLocaleString()}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[p.status] || '#999') + '15', color: statusColors[p.status] || '#999' }}>{p.status}</span></td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.date}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{p.method}</td>
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
