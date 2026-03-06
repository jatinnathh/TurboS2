'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const chartBars = [
  { label: 'Mon', value: 72, color: 'var(--cyan)' },
  { label: 'Tue', value: 85, color: 'var(--cyan)' },
  { label: 'Wed', value: 63, color: 'var(--cyan)' },
  { label: 'Thu', value: 91, color: 'var(--cyan)' },
  { label: 'Fri', value: 78, color: 'var(--cyan)' },
  { label: 'Sat', value: 55, color: 'var(--purple)' },
  { label: 'Sun', value: 42, color: 'var(--purple)' },
];

const linePoints = '0,80 40,65 80,75 120,45 160,55 200,35 240,50 280,25 320,40 360,20';

const pieSegments = [
  { percent: 35, color: 'var(--cyan)', label: 'Emergency' },
  { percent: 25, color: 'var(--purple)', label: 'Outpatient' },
  { percent: 20, color: 'var(--emerald)', label: 'Surgery' },
  { percent: 20, color: 'var(--amber)', label: 'ICU' },
];

function MiniBarChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Weekly Admissions
        </h4>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--emerald-dim)', color: 'var(--emerald)' }}>
          +12.5%
        </span>
      </div>
      <div className="flex items-end gap-2 h-32">
        {chartBars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${bar.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-t-md min-h-[4px]"
              style={{
                background: `linear-gradient(180deg, ${bar.color}, ${bar.color}60)`,
                boxShadow: `0 0 8px ${bar.color}30`,
              }}
            />
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniLineChart() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Patient Satisfaction
        </h4>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--cyan-dim)', color: 'var(--cyan)' }}>
          96.2%
        </span>
      </div>
      <svg viewBox="0 0 360 100" className="w-full h-24">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--purple)" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,100 ${linePoints} 360,100`}
          fill="url(#areaGrad)"
        />
        <motion.polyline
          points={linePoints}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
}

function MiniPieChart() {
  let cumulative = 0;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          Department Distribution
        </h4>
      </div>
      <div className="flex items-center gap-6">
        <svg viewBox="0 0 120 120" className="w-24 h-24 flex-shrink-0">
          {pieSegments.map((seg, i) => {
            const start = cumulative;
            cumulative += seg.percent;
            const startAngle = (start / 100) * 360 - 90;
            const endAngle = (cumulative / 100) * 360 - 90;
            const largeArc = seg.percent > 50 ? 1 : 0;
            const x1 = 60 + 45 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 60 + 45 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 60 + 45 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 60 + 45 * Math.sin((endAngle * Math.PI) / 180);
            return (
              <motion.path
                key={i}
                d={`M 60 60 L ${x1} ${y1} A 45 45 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={seg.color}
                opacity={0.8}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ transformOrigin: '60px 60px' }}
              />
            );
          })}
          <circle cx="60" cy="60" r="25" fill="var(--bg-secondary)" />
        </svg>
        <div className="flex flex-col gap-2">
          {pieSegments.map((seg, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: seg.color }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {seg.label} ({seg.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniMetricCards() {
  const metrics = [
    { label: 'Avg Wait Time', value: '12 min', change: '-3.2%', positive: true },
    { label: 'Bed Turnover', value: '4.2x', change: '+8.1%', positive: true },
    { label: 'Readmission Rate', value: '2.1%', change: '-1.4%', positive: true },
    { label: 'Staff Utilization', value: '87%', change: '+2.3%', positive: true },
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
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
            {m.label}
          </p>
          <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
          <p className="text-xs mt-1" style={{ color: m.positive ? 'var(--emerald)' : 'var(--rose)' }}>
            {m.change}
          </p>
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
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Analytics <span className="gradient-text">Preview</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A glimpse into the powerful dashboards that drive hospital operations.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div style={{ scale, opacity }}>
          <div
            className="rounded-2xl p-6 md:p-8 border"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))',
              borderColor: 'var(--border-subtle)',
              boxShadow: '0 0 60px rgba(0, 212, 255, 0.05), 0 0 120px rgba(124, 58, 237, 0.03)',
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--rose)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--amber)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--emerald)' }} />
                </div>
                <span className="text-sm font-medium ml-2" style={{ color: 'var(--text-secondary)' }}>
                  Hospital Analytics Dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="glow-dot-emerald" style={{ width: 6, height: 6 }} />
                <span className="text-xs" style={{ color: 'var(--emerald)' }}>Live</span>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MiniBarChart />
              <MiniLineChart />
              <MiniPieChart />
              <MiniMetricCards />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
