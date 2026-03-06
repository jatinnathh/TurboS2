'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { roomsList, roomOccupancyByType } from '../data';

const statusColors: Record<string, string> = { Available: '#10B981', Occupied: '#3B82F6', Full: '#F59E0B', Critical: '#EF4444', 'In Use': '#7C3AED' };

export default function RoomsPage() {
  const totalRooms = roomsList.length;
  const occupied = roomsList.filter(r => r.status !== 'Available').length;
  const available = totalRooms - occupied;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Room Management</h1>
        <p className="text-xs text-gray-400">Room occupancy, availability, and utilization</p>
      </header>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Rooms', value: totalRooms.toString() },
            { label: 'Occupied', value: occupied.toString() },
            { label: 'Available', value: available.toString() },
            { label: 'Occupancy Rate', value: `${((occupied / totalRooms) * 100).toFixed(0)}%` },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Occupancy by Room Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roomOccupancyByType} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="type" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip />
              <Bar dataKey="total" name="Total" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              <Bar dataKey="occupied" name="Occupied" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Room Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-gray-100">
                {['Room ID', 'Type', 'Floor', 'Beds', 'Occupied', 'Status', 'Patient', 'Rate/Day'].map(h => (
                  <th key={h} className="px-3 py-3 text-[10px] uppercase tracking-wider font-semibold text-gray-400">{h}</th>
                ))}</tr></thead>
              <tbody>
                {roomsList.map(r => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{r.id}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{r.type}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">Floor {r.floor}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{r.beds}</td>
                    <td className="px-3 py-3 text-xs text-gray-500">{r.occupied}/{r.beds}</td>
                    <td className="px-3 py-3"><span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[r.status] || '#999') + '15', color: statusColors[r.status] || '#999' }}>{r.status}</span></td>
                    <td className="px-3 py-3 text-xs text-gray-500">{r.patient}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">${r.rate.toLocaleString()}</td>
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
