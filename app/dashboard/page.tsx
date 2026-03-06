'use client';

import React from 'react';

import { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import {
  patientStatusData, treatmentTypeData, revenueSummaryData,
  topDoctors, summaryStats, departmentWorkload, recentActivity,
  doctorWorkload, hourlyPatientLoad, workloadOverTime,
  monthlyResolutionTrends, avgHandlingTime, staffUtilization, bedTurnover,
  hourlyLoadByDay, HEATMAP_HOURS, HEATMAP_DAYS,
  sparkPatients, sparkAppointments, sparkRevenue, sparkBedOccupancy,
} from './data';
import AnalyticsToolbar from './AnalyticsToolbar';
import Sparkline from './Sparkline';
import {
  aggregateByTimeRange, filterByDepartment, rankDoctors,
  type TimeRange, type Department,
} from './dataUtils';

/* ── Palette ── */
const DEPT_COLORS: Record<string, string> = {
  Emergency: '#EF4444', Cardiology: '#EC4899', Neurology: '#3B82F6',
  Orthopedics: '#F59E0B', Pediatrics: '#10B981', Oncology: '#8B5CF6', ICU: '#7C3AED',
};
const PIE_COLORS = ['#7C3AED', '#EC4899', '#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

/* ── Icons ── */
const icons: Record<string, React.ReactNode> = {
  patients: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  appointments: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  revenue: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 010 7H6"/></svg>,
  beds: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20M6 8v9"/></svg>,
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-sm font-semibold text-gray-800 mb-1">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-gray-500">{p.name}:</span>
          <span className="font-semibold text-gray-700">{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Mini section header component ── */
function SectionHeader({ color, title, subtitle }: { color: string; title: string; subtitle: string }) {
  return (
    <div className={`border-l-4 pl-4`} style={{ borderColor: color }}>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}

export default function DashboardPage() {
  // ── Global Controls ──
  const [timeRange, setTimeRange] = useState<TimeRange>('Monthly');
  const [department, setDepartment] = useState<Department>('All');
  const [doctorRankOrder, setDoctorRankOrder] = useState<'top' | 'bottom'>('top');
  const [patientFilter, setPatientFilter] = useState<TimeRange>('Monthly');

  // ── Derived Data ──

  // Doctor workload — filter by department, then rank
  const filteredDoctors = useMemo(() => {
    const filtered = department === 'All'
      ? doctorWorkload
      : doctorWorkload.filter(d => d.department.toLowerCase() === department.toLowerCase());
    return rankDoctors(filtered, 'utilization', doctorRankOrder, 8);
  }, [department, doctorRankOrder]);

  // Department workload — filter by selected dept
  const filteredDeptWorkload = useMemo(() => {
    if (department === 'All') return departmentWorkload;
    return departmentWorkload.filter(d => d.name.toLowerCase() === department.toLowerCase());
  }, [department]);

  // Hourly patient load — no time aggregation (hourly), but we keep it
  // Workload over time — aggregate by time range
  const workloadOverTimeAgg = useMemo(
    () => aggregateByTimeRange(workloadOverTime, timeRange, 'month', 'avg'),
    [timeRange],
  );

  // Resolution trends — aggregate by time range
  const resolutionAgg = useMemo(
    () => aggregateByTimeRange(monthlyResolutionTrends, timeRange, 'month'),
    [timeRange],
  );

  // Resolution avg hours — aggregate by time range (average mode)
  const resolutionAvgAgg = useMemo(
    () => aggregateByTimeRange(monthlyResolutionTrends, timeRange, 'month', 'avg'),
    [timeRange],
  );

  // Patient status — separate filter
  const patientStatusAgg = useMemo(
    () => aggregateByTimeRange(patientStatusData, patientFilter, 'month'),
    [patientFilter],
  );

  // Bed turnover — aggregate by time range (average)
  const bedTurnoverAgg = useMemo(
    () => aggregateByTimeRange(bedTurnover, timeRange, 'month', 'avg'),
    [timeRange],
  );

  // Revenue summary — aggregate by time range
  const revenueAgg = useMemo(
    () => aggregateByTimeRange(revenueSummaryData, timeRange, 'month'),
    [timeRange],
  );

  // Department distribution pie data
  const deptDistribution = useMemo(() => {
    return departmentWorkload.map(d => ({ name: d.name, value: d.workload }));
  }, []);

  // Avg handling time — filter by department
  const filteredHandlingTime = useMemo(() => {
    return filterByDepartment(avgHandlingTime, department, 'department');
  }, [department]);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-xs text-gray-400">Hospital Management — Workload Distribution & Resolution Trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search..." className="bg-transparent text-sm text-gray-600 outline-none w-40" />
          </div>
          <div className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center relative cursor-pointer hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'linear-gradient(135deg, #FF2D55, #FF6B8A)' }}>AD</div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-gray-700">Admin User</p>
              <p className="text-[10px] text-gray-400">Hospital Admin</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* ── Global Toolbar (sticky) ── */}
        <div className="sticky top-[53px] z-20 bg-[#f8f9fc]/90 backdrop-blur-md py-3 -mx-6 px-6 border-b border-gray-100/50">
          <AnalyticsToolbar
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            department={department}
            onDepartmentChange={setDepartment}
            showDoctorRank
            doctorRankOrder={doctorRankOrder}
            onDoctorRankOrderChange={setDoctorRankOrder}
          />
        </div>

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat, i) => {
            const sparkData = [sparkPatients, sparkAppointments, sparkRevenue, sparkBedOccupancy][i];
            const sparkColor = ['#EC4899', '#7C3AED', '#10B981', '#3B82F6'][i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 text-pink-500 group-hover:scale-110 transition-transform">{icons[stat.icon]}</div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>{stat.change}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                  </div>
                  <Sparkline data={sparkData} color={sparkColor} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ══════════ WORKLOAD DISTRIBUTION SECTION ══════════ */}
        <SectionHeader color="#7C3AED" title="Workload Distribution" subtitle="Staff & department workload analysis for operational insights" />

        {/* Doctor Workload + Dept Workload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Workload Utilization */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {doctorRankOrder === 'top' ? '▲ Top' : '▼ Bottom'} Performing Doctors
              </h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                {department === 'All' ? 'All Depts' : department} — by Utilization
              </span>
            </div>
            <div className="space-y-3">
              {filteredDoctors.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-8">No doctors in selected department</p>
              ) : (
                filteredDoctors.map((doc, i) => (
                  <motion.div key={doc.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ background: doc.utilization >= 90 ? '#EF4444' : doc.utilization >= 75 ? '#F59E0B' : '#10B981' }}>
                      {doc.name.split(' ')[1][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-gray-700 truncate">{doc.name}</p>
                        <span className="text-[10px] text-gray-400">{doc.activeCases}/{doc.maxCapacity} cases · {doc.department}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${doc.utilization}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                            className="h-full rounded-full" style={{ background: doc.utilization >= 90 ? '#EF4444' : doc.utilization >= 75 ? '#F59E0B' : '#10B981' }} />
                        </div>
                        <span className={`text-[10px] font-bold ${doc.utilization >= 90 ? 'text-red-500' : doc.utilization >= 75 ? 'text-amber-500' : 'text-emerald-500'}`}>{doc.utilization}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Department Workload + Pie Distribution */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-5">Department Workload Distribution</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bar-style workload */}
              <div className="space-y-3">
                {filteredDeptWorkload.map((dept, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-24 truncate">{dept.name}</span>
                    <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${dept.workload}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${dept.color}, ${dept.color}88)` }} />
                    </div>
                    <span className={`text-xs font-bold w-12 text-right ${dept.workload >= 85 ? 'text-red-500' : 'text-gray-600'}`}>{dept.workload}%</span>
                  </div>
                ))}
              </div>
              {/* Pie chart */}
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={deptDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={40} paddingAngle={3} strokeWidth={0}>
                      {deptDistribution.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: any) => [`${v}%`, 'Workload']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Patient Load */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Hourly Patient Load Distribution</h3>
          <p className="text-xs text-gray-400 mb-4">Peak hours and operational load by patient type</p>
          <div className="flex items-center gap-4 mb-3">
            {[{ label: 'Emergency', color: '#EF4444' }, { label: 'Outpatient', color: '#7C3AED' }, { label: 'Admissions', color: '#3B82F6' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyPatientLoad}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="outpatient" name="Outpatient" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="emergency" name="Emergency" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="admissions" name="Admissions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* ── Heatmap: Hourly Patient Load by Day ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-1">Patient Load Heatmap</h3>
          <p className="text-xs text-gray-400 mb-4">Hourly patient load intensity by day of week — darker = higher load</p>
          <div className="overflow-x-auto">
            <div style={{ display: 'grid', gridTemplateColumns: `60px repeat(${HEATMAP_HOURS.length}, 1fr)`, gap: '2px' }}>
              {/* Header row */}
              <div />
              {HEATMAP_HOURS.map(h => (
                <div key={h} className="text-center text-[9px] text-gray-400 font-medium py-1">{h}</div>
              ))}
              {/* Data rows */}
              {HEATMAP_DAYS.map((day, di) => (
                <React.Fragment key={day}>
                  <div className="flex items-center text-xs text-gray-500 font-medium pr-2">{day}</div>
                  {hourlyLoadByDay[di].map((val, hi) => {
                    const allVals = hourlyLoadByDay.flat();
                    const minV = Math.min(...allVals);
                    const maxV = Math.max(...allVals);
                    const ratio = (val - minV) / (maxV - minV);
                    // Green → Yellow → Red
                    const r = Math.round(ratio > 0.5 ? 239 : 16 + (ratio * 2) * (239-16));
                    const g = Math.round(ratio > 0.5 ? 68 + (1-ratio)*2*117 : 185);
                    const b = Math.round(ratio > 0.5 ? 68 : 81 - ratio*2*13);
                    return (
                      <div
                        key={`${di}-${hi}`}
                        className="rounded-[3px] flex items-center justify-center text-[9px] font-semibold transition-transform hover:scale-110 cursor-default"
                        style={{
                          background: `rgba(${r},${g},${b},${0.2 + ratio * 0.7})`,
                          color: ratio > 0.6 ? '#fff' : '#374151',
                          minHeight: '28px',
                        }}
                        title={`${day} ${HEATMAP_HOURS[hi]}: ${val} patients`}
                      >
                        {val}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center justify-end gap-2 mt-3">
              <span className="text-[9px] text-gray-400">Low</span>
              <div className="flex gap-0.5">
                {[0, 0.25, 0.5, 0.75, 1].map((r, i) => (
                  <div key={i} className="w-5 h-3 rounded-sm" style={{ background: `rgba(${r > 0.5 ? 239 : 16 + r*2*223},${r > 0.5 ? 68 + (1-r)*2*117 : 185},${r > 0.5 ? 68 : 81-r*2*13},${0.3 + r*0.6})` }} />
                ))}
              </div>
              <span className="text-[9px] text-gray-400">High</span>
            </div>
          </div>
        </div>

        {/* Workload Over Time + Staff Utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-800">Department Workload Trends (%)</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Capacity utilization by department</p>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={workloadOverTimeAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="emergency" name="Emergency" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="icu" name="ICU" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="cardiology" name="Cardiology" stroke="#EC4899" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="orthopedics" name="Orthopedics" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="neurology" name="Neurology" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Staff Utilization Breakdown</h3>
            <p className="text-xs text-gray-400 mb-4">Time allocation: Clinical vs Admin vs Idle</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={staffUtilization} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `${v}%`} />
                <YAxis type="category" dataKey="role" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} width={85} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="utilized" name="Clinical" stackId="a" fill="#7C3AED" />
                <Bar dataKey="admin" name="Admin" stackId="a" fill="#A78BFA" />
                <Bar dataKey="idle" name="Idle" stackId="a" fill="#E2E8F0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ══════════ RESOLUTION TRENDS SECTION ══════════ */}
        <SectionHeader color="#10B981" title="Resolution Trends" subtitle="Case resolution, handling time, and operational efficiency" />

        {/* Monthly Resolution + Avg Resolution Time */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-800">Resolution Trends</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 font-medium">{timeRange}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Cases resolved, pending, and escalated</p>
            <div className="flex items-center gap-4 mb-3">
              {[{ label: 'Resolved', color: '#10B981' }, { label: 'Pending', color: '#F59E0B' }, { label: 'Escalated', color: '#EF4444' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={resolutionAgg} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="resolved" name="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="escalated" name="Escalated" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-800">Average Resolution Time</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Hours to resolve cases (lower is better)</p>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={resolutionAvgAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `${v}h`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="avgResolutionHrs" name="Avg Hours" stroke="#7C3AED" fill="#7C3AED" fillOpacity={0.12} strokeWidth={2.5} dot={{ r: 4, fill: '#7C3AED' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Avg Handling Time by Department */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-gray-800">Average Handling Time by Department</h3>
            <span className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">{department === 'All' ? 'All Departments' : department}</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Wait → Treatment → Discharge pipeline (minutes)</p>
          <div className="flex items-center gap-4 mb-3">
            {[{ label: 'Avg Wait', color: '#EF4444' }, { label: 'Avg Treatment', color: '#7C3AED' }, { label: 'Avg Discharge', color: '#3B82F6' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={filteredHandlingTime} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `${v}m`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgWaitMin" name="Avg Wait" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgTreatmentMin" name="Avg Treatment" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgDischargeMin" name="Avg Discharge" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bed Turnover + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-lg font-bold text-gray-800">Bed Turnover Rate</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Patients per bed per period (higher = more efficient)</p>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={bedTurnoverAgg}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="generalWard" name="General Ward" stroke="#7C3AED" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="icu" name="ICU" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="private" name="Private" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
              <button className="text-xs text-pink-500 font-medium hover:text-pink-600">View All</button>
            </div>
            {recentActivity.map((item, i) => {
              const typeColors: Record<string, string> = { admit: '#FF2D55', surgery: '#7C3AED', discharge: '#10B981', lab: '#3B82F6', appointment: '#F59E0B', prescription: '#EC4899' };
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: typeColors[item.type] || '#999' }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{item.action}</p>
                    <p className="text-[10px] text-gray-400">{item.department}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Patient Status (with its own time filter) ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Patient Status</h3>
              <div className="flex items-center gap-4 mt-2">
                {[{ label: 'Patient In', color: '#7C3AED' }, { label: 'Patient Out', color: '#A78BFA' }, { label: 'Discharged', color: '#EC4899' }, { label: 'Emergency', color: '#F9A8D4' }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} /><span className="text-[10px] text-gray-400">{l.label}</span></div>
                ))}
              </div>
            </div>
            <select value={patientFilter} onChange={(e) => setPatientFilter(e.target.value as TimeRange)} className="text-xs px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 cursor-pointer outline-none">
              <option>Monthly</option><option>Quarterly</option><option>Yearly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={patientStatusAgg} barGap={2} barCategoryGap="15%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="patientIn" name="Patient In" stackId="a" fill="#7C3AED" />
              <Bar dataKey="patientOut" name="Patient Out" stackId="a" fill="#A78BFA" />
              <Bar dataKey="discharged" name="Discharged" stackId="a" fill="#EC4899" />
              <Bar dataKey="emergency" name="Emergency" stackId="a" fill="#F9A8D4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Treatment + Revenue */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Treatment Type</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={treatmentTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="general" name="General" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="surgery" name="Surgery" stroke="#EC4899" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="icu" name="ICU" stroke="#F9A8D4" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Revenue Summary</h3>
              <span className="text-[10px] px-2 py-1 rounded-full bg-purple-50 text-purple-600 font-medium">{timeRange}</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueAgg} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v: any) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Bar dataKey="running" name="Running" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cycling" name="Cycling" fill="#A78BFA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Doctors */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Top Doctors</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topDoctors.map((doctor, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group cursor-pointer">
                <div className="h-32 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${doctor.color}15, ${doctor.color}08)` }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform" style={{ background: `linear-gradient(135deg, ${doctor.color}, ${doctor.color}cc)` }}>
                    {doctor.name.split(' ').slice(1).map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-semibold text-gray-800">{doctor.name}</p>
                  <p className="text-xs text-gray-400 italic mt-0.5">{doctor.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
