'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const departments = [
  {
    name: 'Emergency',
    abbr: 'ER',
    patients: 47,
    capacity: 60,
    staff: 32,
    status: 'high',
    color: 'var(--rose)',
  },
  {
    name: 'Cardiology',
    abbr: 'CARD',
    patients: 28,
    capacity: 40,
    staff: 18,
    status: 'normal',
    color: 'var(--cyan)',
  },
  {
    name: 'Neurology',
    abbr: 'NEUR',
    patients: 15,
    capacity: 25,
    staff: 12,
    status: 'normal',
    color: 'var(--purple)',
  },
  {
    name: 'Orthopedics',
    abbr: 'ORTH',
    patients: 22,
    capacity: 30,
    staff: 14,
    status: 'moderate',
    color: 'var(--amber)',
  },
  {
    name: 'Pediatrics',
    abbr: 'PED',
    patients: 19,
    capacity: 35,
    staff: 20,
    status: 'normal',
    color: 'var(--emerald)',
  },
  {
    name: 'Oncology',
    abbr: 'ONC',
    patients: 31,
    capacity: 35,
    staff: 22,
    status: 'high',
    color: 'var(--rose)',
  },
];

function DepartmentCard({ dept, index }: { dept: typeof departments[0]; index: number }) {
  const occupancy = Math.round((dept.patients / dept.capacity) * 100);
  const statusColors: Record<string, string> = {
    normal: 'var(--emerald)',
    moderate: 'var(--amber)',
    high: 'var(--rose)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-6 min-w-[280px] md:min-w-[320px] snap-center flex-shrink-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold"
            style={{ background: `${dept.color}15`, color: dept.color }}
          >
            {dept.abbr}
          </div>
          <div>
            <h4 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>{dept.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: statusColors[dept.status] }}
              />
              <span className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>
                {dept.status} load
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Occupancy bar */}
      <div className="mb-5">
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: 'var(--text-secondary)' }}>Bed Occupancy</span>
          <span style={{ color: dept.color }}>{occupancy}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(148, 163, 184, 0.1)' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${occupancy}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${dept.color}, ${dept.color}aa)`,
              boxShadow: `0 0 12px ${dept.color}40`,
            }}
          />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(148, 163, 184, 0.05)' }}>
          <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{dept.patients}</div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Patients</div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(148, 163, 184, 0.05)' }}>
          <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{dept.capacity}</div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Capacity</div>
        </div>
        <div className="text-center p-2 rounded-lg" style={{ background: 'rgba(148, 163, 184, 0.05)' }}>
          <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{dept.staff}</div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Staff</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DepartmentsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="departments" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 px-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Department <span className="gradient-text">Overview</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Monitor every department at a glance — real-time occupancy, staffing, and patient loads.
          </p>
        </motion.div>

        {/* Horizontal scrolling cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {departments.map((dept, i) => (
            <DepartmentCard key={i} dept={dept} index={i} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-8 gap-2">
          {departments.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: i === 0 ? 'var(--cyan)' : 'rgba(148, 163, 184, 0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
