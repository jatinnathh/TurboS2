'use client';
import { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { patientsList, patientDemographics, admissionTrend, sparkPatients, sparkAdmitted, sparkICU, sparkDischarged } from '../data';
import AnalyticsToolbar from '../AnalyticsToolbar';
import { filterByDepartment, type Department } from '../dataUtils';
import Sparkline from '../Sparkline';
import SortableTable, { type Column } from '../SortableTable';

const statusColors: Record<string, string> = { Admitted: '#3B82F6', 'Under Treatment': '#F59E0B', Recovering: '#10B981', ICU: '#EF4444', Discharged: '#6B7280' };
const conditionColors: Record<string, string> = { Stable: '#10B981', Critical: '#EF4444', Moderate: '#F59E0B', Recovered: '#6B7280' };

type Patient = typeof patientsList[number];

const columns: Column<Patient>[] = [
  { key: 'id', label: 'ID', sortable: true, cellClassName: 'px-3 py-3 text-xs font-mono text-gray-500' },
  { key: 'name', label: 'Name', sortable: true, cellClassName: 'px-3 py-3 text-xs font-semibold text-gray-700' },
  { key: 'age', label: 'Age', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'gender', label: 'Gender', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'bloodType', label: 'Blood', sortable: false, render: (p) => <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">{p.bloodType}</span> },
  { key: 'department', label: 'Department', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'doctor', label: 'Doctor', sortable: true, cellClassName: 'px-3 py-3 text-xs text-gray-500' },
  { key: 'status', label: 'Status', sortable: true, render: (p) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (statusColors[p.status] || '#999') + '15', color: statusColors[p.status] || '#999' }}>{p.status}</span> },
  { key: 'condition', label: 'Condition', sortable: true, render: (p) => <span className="text-[10px] px-2 py-1 rounded-full font-semibold" style={{ background: (conditionColors[p.condition] || '#999') + '15', color: conditionColors[p.condition] || '#999' }}>{p.condition}</span> },
];

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState<Department>('All');
  const [timeRange, setTimeRange] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');

  const deptFiltered = useMemo(() => filterByDepartment(patientsList, department, 'department'), [department]);
  const filtered = useMemo(() =>
    deptFiltered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())),
    [deptFiltered, search]
  );

  // Computed stats
  const totalPatients = deptFiltered.length;
  const admitted = deptFiltered.filter(p => p.status === 'Admitted' || p.status === 'Under Treatment').length;
  const icuCount = deptFiltered.filter(p => p.status === 'ICU').length;
  const discharged = deptFiltered.filter(p => p.status === 'Discharged').length;

  const stats = [
    { label: 'Total Patients', value: totalPatients.toLocaleString(), spark: sparkPatients, color: '#7C3AED' },
    { label: 'Currently Admitted', value: admitted.toString(), spark: sparkAdmitted, color: '#3B82F6' },
    { label: 'ICU Patients', value: icuCount.toString(), spark: sparkICU, color: '#EF4444' },
    { label: 'Discharged', value: discharged.toString(), spark: sparkDischarged, color: '#10B981' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3">
        <h1 className="text-xl font-bold text-gray-800">Patient Management</h1>
        <p className="text-xs text-gray-400">Monitor patient admissions, demographics, and trends</p>
      </header>
      <div className="p-6 space-y-6">
        {/* Toolbar */}
        <div className="sticky top-[53px] z-20 bg-[#f8f9fc]/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-gray-100/50">
          <AnalyticsToolbar timeRange={timeRange} onTimeRangeChange={setTimeRange} department={department} onDepartmentChange={setDepartment} />
        </div>

        {/* Quick Stats with Sparklines */}
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

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Patient Table — Sortable */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Patient Records</h3>
            <input type="text" placeholder="Search patients..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="text-sm px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-purple-300 w-64" />
          </div>
          <SortableTable columns={columns} data={filtered} rowKey={(p) => p.id} emptyMessage="No patients found." />
        </div>
      </div>
    </>
  );
}
