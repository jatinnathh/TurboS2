'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
}

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="gradient-text text-4xl md:text-5xl font-bold tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

function StatCard({ value, suffix, label, icon, color, delay }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden group"
    >
      {/* Glow accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: `${color}15` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>

      {/* Counter */}
      <AnimatedCounter target={value} suffix={suffix} inView={isInView} />

      {/* Label */}
      <p className="mt-3 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      value: 12500,
      suffix: '+',
      label: 'Patients Managed Monthly',
      color: 'var(--cyan)',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      value: 24,
      suffix: '',
      label: 'Active Departments',
      color: 'var(--purple)',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      value: 98,
      suffix: '%',
      label: 'System Uptime',
      color: 'var(--emerald)',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      value: 350,
      suffix: '+',
      label: 'Beds Monitored',
      color: 'var(--amber)',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 17h20M6 8v9" />
        </svg>
      ),
    },
  ];

  return (
    <section id="stats" className="relative py-24 md:py-32 px-6">
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
            Impact at <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Transforming hospital operations with data-driven insights and real-time monitoring.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
