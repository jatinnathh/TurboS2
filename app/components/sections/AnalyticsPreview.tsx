'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* Real data matching /dashboard */
const resolutionData = [
  { month: 'Jan', resolved: 580, pending: 95, escalated: 28 },
  { month: 'Feb', resolved: 540, pending: 110, escalated: 32 },
  { month: 'Mar', resolved: 620, pending: 85, escalated: 22 },
  { month: 'Apr', resolved: 600, pending: 90, escalated: 25 },
  { month: 'May', resolved: 650, pending: 78, escalated: 20 },
  { month: 'Jun', resolved: 580, pending: 105, escalated: 30 },
];

const handlingTime = [
  { dept: 'Emergency', wait: 12, treat: 45, discharge: 90 },
  { dept: 'Cardiology', wait: 18, treat: 60, discharge: 180 },
  { dept: 'Neurology', wait: 22, treat: 55, discharge: 240 },
  { dept: 'Orthopedics', wait: 15, treat: 70, discharge: 360 },
  { dept: 'ICU', wait: 5, treat: 120, discharge: 720 },
];

const staffUtil = [
  { role: 'Doctors', utilized: 84, admin: 6, idle: 10 },
  { role: 'Nurses', utilized: 78, admin: 10, idle: 12 },
  { role: 'Surgeons', utilized: 72, admin: 10, idle: 18 },
  { role: 'Lab Techs', utilized: 88, admin: 7, idle: 5 },
];

function ResolutionChart() {
  const maxVal = 700;
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Monthly Resolution Trends</h4>
        <div className="flex items-center gap-3">
          {[{ l: 'Resolved', c: 'var(--emerald)' }, { l: 'Pending', c: 'var(--amber)' }, { l: 'Escalated', c: 'var(--rose)' }].map(x => (
            <div key={x.l} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: x.c }} /><span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{x.l}</span></div>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-3 h-32">
        {resolutionData.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col-reverse gap-[2px]">
              <motion.div initial={{ height: 0 }} whileInView={{ height: `${(d.resolved / maxVal) * 80}px` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 }}
                className="w-full rounded-t" style={{ background: 'var(--emerald)' }} />
              <motion.div initial={{ height: 0 }} whileInView={{ height: `${(d.pending / maxVal) * 80}px` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 + 0.1 }}
                className="w-full rounded-t" style={{ background: 'var(--amber)' }} />
              <motion.div initial={{ height: 0 }} whileInView={{ height: `${(d.escalated / maxVal) * 80}px` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.08 + 0.2 }}
                className="w-full rounded-t" style={{ background: 'var(--rose)' }} />
            </div>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HandlingTimeChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Avg Handling Time by Department</h4>
        <div className="flex items-center gap-3">
          {[{ l: 'Wait', c: 'var(--rose)' }, { l: 'Treatment', c: 'var(--purple)' }, { l: 'Discharge', c: 'var(--cyan)' }].map(x => (
            <div key={x.l} className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: x.c }} /><span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{x.l}</span></div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {handlingTime.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-[10px] w-16 truncate" style={{ color: 'var(--text-secondary)' }}>{d.dept}</span>
            <div className="flex-1 flex gap-[2px] h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(d.wait / (d.wait + d.treat + d.discharge)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full" style={{ background: 'var(--rose)' }} />
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(d.treat / (d.wait + d.treat + d.discharge)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 + 0.1 }}
                className="h-full" style={{ background: 'var(--purple)' }} />
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(d.discharge / (d.wait + d.treat + d.discharge)) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                className="h-full" style={{ background: 'var(--cyan)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffUtilChart() {
  return (
    <div className="glass-card p-6">
      <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Staff Utilization Breakdown</h4>
      <div className="space-y-3">
        {staffUtil.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{s.role}</span>
              <span className="text-[10px] font-bold" style={{ color: 'var(--purple)' }}>{s.utilized}% clinical</span>
            </div>
            <div className="flex h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.utilized}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                style={{ background: 'var(--purple)' }} />
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.admin}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 + 0.1 }}
                style={{ background: 'var(--cyan)' }} />
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.idle}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                style={{ background: 'rgba(255,255,255,0.08)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResolutionMetrics() {
  const metrics = [
    { label: 'Avg Resolution', value: '16.8h', change: '-12%', positive: true },
    { label: 'Resolution Rate', value: '87.3%', change: '+4.2%', positive: true },
    { label: 'Escalation Rate', value: '3.8%', change: '-1.1%', positive: true },
    { label: 'Bed Turnover', value: '3.5x', change: '+8.1%', positive: true },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="glass-card p-4"
        >
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>{m.label}</p>
          <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
          <p className="text-xs mt-1" style={{ color: m.positive ? 'var(--emerald)' : 'var(--rose)' }}>{m.change}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function AnalyticsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <section id="analytics" ref={ref} className="relative py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Resolution <span className="gradient-text">Trends</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Track case resolution, handling times, and staff utilization — all in real-time.
          </p>
        </motion.div>

        <motion.div style={{ scale, opacity }}>
          <div
            className="rounded-2xl p-6 md:p-8 border"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 0 60px rgba(0, 212, 255, 0.05), 0 0 120px rgba(124, 58, 237, 0.03)',
            }}
          >
            <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--rose)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--amber)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--emerald)' }} />
                </div>
                <span className="text-sm font-medium ml-2" style={{ color: 'var(--text-secondary)' }}>
                  Resolution & Efficiency Analytics
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="glow-dot-emerald" style={{ width: 6, height: 6 }} />
                <span className="text-xs" style={{ color: 'var(--emerald)' }}>Live</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResolutionChart />
              <HandlingTimeChart />
              <StaffUtilChart />
              <ResolutionMetrics />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
