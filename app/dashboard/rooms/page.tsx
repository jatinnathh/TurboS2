'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { roomsList, roomOccupancyByType, sparkOccupancy, sparkPatients } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { type TimeRange, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const statusColors: Record<string, string> = { Available: '#10B981', Occupied: '#3B82F6', Full: '#F59E0B', Critical: '#EF4444', 'In Use': '#7C3AED' };

type Room = typeof roomsList[number];

const columns: Column<Room>[] = [
  { key: 'id', label: 'Room ID', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'type', label: 'Type', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'floor', label: 'Floor', sortable: true, render: (r) => <span className="text-xs text-gray-500">Floor {r.floor}</span> },
  { key: 'beds', label: 'Beds', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'occupied', label: 'Occupied', sortable: true, render: (r) => <span className="text-xs text-gray-500">{r.occupied}/{r.beds}</span> },
  { key: 'status', label: 'Status', sortable: true, render: (r) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[r.status] || '#999') + '15', color: statusColors[r.status] || '#999' }}>{r.status}</span> },
  { key: 'patient', label: 'Patient', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'rate', label: 'Rate/Day', sortable: true, render: (r) => <span className="text-xs font-semibold text-gray-700">${r.rate.toLocaleString()}</span> },
];

export default function RoomsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
  const [department, setDepartment] = useState<Department>('All');

  const totalRooms = roomsList.length;
  const occupied = roomsList.filter(r => r.status !== 'Available').length;
  const available = totalRooms - occupied;

  const sparkAvailable = [3, 4, 2, 3, 5, 4, 3, 2, 4, 5, 3, 4];
  const sparkRate = [200, 450, 800, 2500, 5000, 1500, 200, 450, 800, 2500, 5000, 1500];

  const stats = [
    { label: 'Total Rooms', value: totalRooms.toString(), spark: sparkPatients, color: '#7C3AED' },
    { label: 'Occupied', value: occupied.toString(), spark: sparkOccupancy, color: '#3B82F6' },
    { label: 'Available', value: available.toString(), spark: sparkAvailable, color: '#10B981' },
    { label: 'Occupancy Rate', value: `${((occupied / totalRooms) * 100).toFixed(0)}%`, spark: sparkOccupancy, color: '#F59E0B' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Room Management</h1>
        <p className="text-xs text-gray-400">Room occupancy, availability, and utilization</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="sticky top-[53px] z-20 bg-[#f8f9fc]/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-gray-100/50">
          <AnalyticsToolbar timeRange={timeRange} onTimeRangeChange={setTimeRange} department={department} onDepartmentChange={setDepartment} />
        </div>

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

        {/* Room Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Room Directory</h3>
          <SortableTable columns={columns} data={roomsList} rowKey={(r) => r.id} />
        </div>
      </div>
    </>
  );
}
