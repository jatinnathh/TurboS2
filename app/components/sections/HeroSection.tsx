'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ── Real dashboard data (matches /dashboard) ── */
const summaryStats = [
  { label: 'Total Patients', value: '12,345', change: '+65%', icon: '👥' },
  { label: 'Appointments', value: '1,847', change: '+12%', icon: '📅' },
  { label: 'Revenue', value: '$3.2M', change: '+8.4%', icon: '💰' },
  { label: 'Bed Occupancy', value: '87%', change: '-2.1%', icon: '🏥' },
];

const doctorWorkload = [
  { name: 'Dr. Westervelt', cases: '18/22', pct: 82, color: '#F59E0B' },
  { name: 'Dr. Levin', cases: '14/18', pct: 78, color: '#F59E0B' },
  { name: 'Dr. Bator', cases: '20/20', pct: 100, color: '#EF4444' },
  { name: 'Dr. Workman', cases: '24/25', pct: 96, color: '#EF4444' },
  { name: 'Dr. Turner', cases: '12/16', pct: 75, color: '#F59E0B' },
  { name: 'Dr. Patel', cases: '16/20', pct: 80, color: '#F59E0B' },
  { name: 'Dr. Kim', cases: '22/24', pct: 92, color: '#EF4444' },
  { name: 'Dr. Hassan', cases: '15/20', pct: 75, color: '#F59E0B' },
];

const departmentWorkload = [
  { name: 'Emergency', pct: 92, color: '#EF4444' },
  { name: 'Cardiology', pct: 78, color: '#10B981' },
  { name: 'Neurology', pct: 65, color: '#3B82F6' },
  { name: 'Orthopedics', pct: 71, color: '#F59E0B' },
  { name: 'Pediatrics', pct: 58, color: '#10B981' },
  { name: 'Oncology', pct: 84, color: '#EC4899' },
];

const sidebarItems = [
  { label: 'Dashboard', active: true },
  { label: 'Patients' },
  { label: 'Staff' },
  { label: 'Appointment' },
  { label: 'Department' },
  { label: 'Payment' },
  { label: 'Human Resource' },
  { label: 'Salaries' },
  { label: 'Rooms' },
  { label: 'Ambulance' },
  { label: 'Support' },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FF2D55 0%, #FF1744 30%, #E91E63 60%, var(--bg-primary) 100%)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 40% 50%, rgba(255, 45, 85, 0.3) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16"
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Hospital Management System
          </span>
        </motion.div>

        {/* Monitor frame */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ scale: dashboardScale }}
        >
          {/* Monitor bezel */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#1a1a2e',
              padding: '8px',
              boxShadow: '0 50px 100px rgba(0,0,0,0.5), 0 0 80px rgba(255,45,85,0.15)',
            }}
          >
            {/* ═══ REAL DASHBOARD CONTENT ═══ */}
            <div className="rounded-xl overflow-hidden relative" style={{ background: '#f8f9fc', minHeight: '560px' }}>
              <div className="flex h-full" style={{ minHeight: '560px' }}>

                {/* ── Dark sidebar (matches real dashboard) ── */}
                <div className="flex-shrink-0 flex flex-col py-4 px-3 gap-0.5" style={{ background: '#0f172a', width: '160px' }}>
                  {/* Logo */}
                  <div className="flex items-center gap-2 px-2 mb-4">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black" style={{ background: 'linear-gradient(135deg, #FF2D55, #FF6B8A)', color: '#fff' }}>T2</div>
                    <span className="text-xs font-bold text-white">TurboS2</span>
                  </div>

                  {sidebarItems.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.04 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] cursor-pointer transition-all"
                      style={{
                        background: item.active ? 'linear-gradient(135deg, #7C3AED, #EC4899)' : 'transparent',
                        color: item.active ? '#fff' : '#94a3b8',
                      }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: item.active ? '#fff' : '#475569' }} />
                      {item.label}
                    </motion.div>
                  ))}

                  <div className="flex-1" />
                  <div className="flex items-center gap-2 px-3 py-2 text-[10px] text-gray-400">
                    <span>↩</span> Collapse
                  </div>
                </div>

                {/* ── Main content ── */}
                <div className="flex-1 overflow-hidden">

                  {/* Top bar */}
                  <div className="flex items-center justify-between px-5 py-2.5" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                    <div>
                      <p className="text-sm font-bold text-gray-800">Analytics Dashboard</p>
                      <p className="text-[9px] text-gray-400">Hospital Management — Workload Distribution & Resolution Trends</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                        <span className="text-[9px] text-gray-300">Search...</span>
                      </div>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 relative">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
                        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-500 border border-white" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: 'linear-gradient(135deg, #FF2D55, #FF6B8A)' }}>AD</div>
                        <div className="hidden md:block">
                          <p className="text-[9px] font-semibold text-gray-700">Admin User</p>
                          <p className="text-[7px] text-gray-400">Hospital Admin</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: '500px' }}>

                    {/* Summary stat cards */}
                    <div className="grid grid-cols-4 gap-2">
                      {summaryStats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="bg-white rounded-xl p-3 border border-gray-100"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">{stat.icon}</span>
                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">{stat.change}</span>
                          </div>
                          <p className="text-sm font-bold text-gray-800">{stat.value}</p>
                          <p className="text-[8px] text-gray-400">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Workload Distribution heading */}
                    <div className="border-l-3 border-purple-500 pl-2" style={{ borderLeftWidth: '3px', borderLeftColor: '#7C3AED' }}>
                      <p className="text-[11px] font-bold text-gray-800">Workload Distribution</p>
                      <p className="text-[8px] text-gray-400">Staff & department workload analysis for operational insights</p>
                    </div>

                    {/* Doctor Workload + Department Workload */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Doctor Workload */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="bg-white rounded-xl p-3 border border-gray-100"
                      >
                        <p className="text-[10px] font-bold text-gray-800 mb-2">Doctor Workload Utilization</p>
                        <div className="space-y-1.5">
                          {doctorWorkload.map((doc, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full flex items-center justify-center text-[6px] font-bold text-white flex-shrink-0" style={{ background: doc.pct >= 90 ? '#EF4444' : '#F59E0B' }}>
                                {doc.name.split(' ')[1][0]}
                              </div>
                              <span className="text-[8px] text-gray-600 w-16 truncate">{doc.name.replace('Dr. ', '')}</span>
                              <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${doc.pct}%` }}
                                  transition={{ duration: 1.2, delay: 1 + i * 0.08 }}
                                  className="h-full rounded-full"
                                  style={{ background: doc.color }}
                                />
                              </div>
                              <span className="text-[7px] text-gray-400 w-10 text-right">{doc.cases}</span>
                              <span className="text-[7px] font-bold w-6 text-right" style={{ color: doc.pct >= 90 ? '#EF4444' : '#F59E0B' }}>{doc.pct}%</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Department Workload */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1 }}
                        className="bg-white rounded-xl p-3 border border-gray-100"
                      >
                        <p className="text-[10px] font-bold text-gray-800 mb-2">Department Workload</p>
                        <div className="space-y-2.5">
                          {departmentWorkload.map((dept, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-[8px] text-gray-500 w-16 truncate">{dept.name}</span>
                              <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${dept.pct}%` }}
                                  transition={{ duration: 1.2, delay: 1.1 + i * 0.08 }}
                                  className="h-full rounded-full"
                                  style={{ background: dept.color }}
                                />
                              </div>
                              <span className="text-[8px] font-bold" style={{ color: dept.pct >= 85 ? '#EF4444' : '#475569' }}>{dept.pct}%</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Hourly Patient Load (mini bar chart using divs) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                      className="bg-white rounded-xl p-3 border border-gray-100"
                    >
                      <p className="text-[10px] font-bold text-gray-800 mb-1">Hourly Patient Load Distribution</p>
                      <p className="text-[7px] text-gray-400 mb-2">Peak hours and operational load by patient type</p>
                      <div className="flex items-center gap-3 mb-2">
                        {[{ l: 'Emergency', c: '#EF4444' }, { l: 'Outpatient', c: '#7C3AED' }, { l: 'Admissions', c: '#3B82F6' }].map(legend => (
                          <div key={legend.l} className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: legend.c }} />
                            <span className="text-[7px] text-gray-400">{legend.l}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-end gap-[3px] h-16">
                        {[8,12,18,22,25,20,15,18,22,20,24,28,30,25,18,14,10].map((v, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${(v / 30) * 100}%` }}
                            transition={{ duration: 0.8, delay: 1.3 + i * 0.03 }}
                            className="flex-1 rounded-t-sm"
                            style={{ background: `linear-gradient(180deg, #7C3AED, #7C3AED80)`, minWidth: '3px' }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-[6px] text-gray-300">6AM</span>
                        <span className="text-[6px] text-gray-300">12PM</span>
                        <span className="text-[6px] text-gray-300">6PM</span>
                        <span className="text-[6px] text-gray-300">10PM</span>
                      </div>
                    </motion.div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitor stand */}
          <div className="flex justify-center mt-0">
            <div className="w-20 h-6 rounded-b-2xl" style={{ background: '#1a1a2e' }} />
          </div>
          <div className="flex justify-center">
            <div className="w-40 h-3 rounded-b-xl" style={{ background: '#252540' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium tracking-widest uppercase text-white/60">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
