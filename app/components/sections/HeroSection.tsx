'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

/* Sidebar icon component */
function SidebarIcon({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
      style={{
        background: active ? 'linear-gradient(135deg, #FF2D55, #FF6B8A)' : 'rgba(0,0,0,0.04)',
        color: active ? '#fff' : '#94a3b8',
      }}
    >
      {children}
    </div>
  );
}

/* Status badge component */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Low: { bg: '#FEF3C7', text: '#D97706' },
    High: { bg: '#FEE2E2', text: '#EF4444' },
    Normal: { bg: '#D1FAE5', text: '#059669' },
  };
  const c = colors[status] || colors.Normal;
  return (
    <span
      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
      style={{ background: c.bg, color: c.text }}
    >
      {status}
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);

  const indicators = [
    { name: 'SHBG', type: 'Hormone', low: '<21', result: '16 nmol/L', high: '>190', status: 'Low' },
    { name: 'Testosterone', type: 'Hormone', low: '<0.5', result: '0.5 ng/mL', high: '>0.48', status: 'High' },
    { name: 'SHBG', type: 'Hormone', low: '<21', result: '16 nmol/L', high: '>190', status: 'Low' },
    { name: 'DHEA-S', type: 'Hormone', low: '<35', result: '136 ug/dL', high: '>430', status: 'Normal' },
    { name: 'Testosterone', type: 'Hormone', low: '<0.5', result: '0.5 ng/mL', high: '>0.48', status: 'High' },
  ];

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
            {/* Dashboard content */}
            <div
              className="rounded-xl overflow-hidden relative"
              style={{
                background: '#f5f7fa',
                minHeight: '560px',
              }}
            >
              <div className="flex h-full" style={{ minHeight: '560px' }}>
                {/* Sidebar */}
                <div
                  className="flex flex-col items-center py-5 px-2 gap-3 flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    borderRight: '1px solid rgba(0,0,0,0.06)',
                    width: '56px',
                  }}
                >
                  {/* Logo */}
                  <div className="mb-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black"
                      style={{ background: 'linear-gradient(135deg, #FF2D55, #FF6B8A)', color: '#fff' }}
                    >
                      T2
                    </div>
                  </div>

                  <SidebarIcon active>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h1v7c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h1a1 1 0 00.7-1.7l-9-9a1 1 0 00-1.4 0l-9 9A1 1 0 003 13z"/></svg>
                  </SidebarIcon>
                  <SidebarIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/></svg>
                  </SidebarIcon>
                  <SidebarIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </SidebarIcon>
                  <SidebarIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                  </SidebarIcon>
                  <SidebarIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  </SidebarIcon>
                  <SidebarIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                  </SidebarIcon>

                  <div className="flex-1" />

                  {/* Refresh */}
                  <SidebarIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
                  </SidebarIcon>

                  {/* Toggle */}
                  <div className="w-9 h-5 rounded-full relative cursor-pointer" style={{ background: '#3B82F6' }}>
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </div>

                {/* Main dashboard area */}
                <div className="flex-1 relative overflow-hidden">

                  {/* Top bar */}
                  <div className="relative z-20 flex items-center justify-between px-6 py-3" style={{ background: 'rgba(245,247,250,0.9)', backdropFilter: 'blur(10px)' }}>
                    <div />
                    {/* Search */}
                    <div
                      className="flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{
                        background: '#fff',
                        border: '1px solid rgba(0,0,0,0.08)',
                        minWidth: '180px',
                      }}
                    >
                      <span className="text-xs text-gray-400">Search...</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                      </svg>
                    </div>

                    {/* Right controls */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm relative">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-white" />
                      </div>
                      {/* Profile */}
                      <div className="flex items-center gap-2 pl-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF6B8A, #FF2D55)' }}>
                          <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">CR</div>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-[11px] font-semibold text-gray-800 leading-tight">Charles Robbie</p>
                          <p className="text-[9px] text-gray-400">25 years old · New York, USA</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main content area — anatomy behind, data overlaid */}
                  <div className="relative" style={{ minHeight: '460px' }}>

                    {/* Anatomy image — large, positioned behind the title */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.4, delay: 0.5 }}
                      className="absolute z-[1] pointer-events-none"
                      style={{
                        top: '-20px',
                        left: '0px',
                        width: '420px',
                        height: '500px',
                      }}
                    >
                      {/* Red glow behind the anatomy */}
                      <div
                        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4"
                        style={{
                          width: '300px',
                          height: '300px',
                          borderRadius: '50%',
                          background: 'radial-gradient(circle, rgba(255,45,85,0.6) 0%, rgba(255,45,85,0.25) 40%, transparent 70%)',
                          filter: 'blur(40px)',
                        }}
                      />
                      <Image
                        src="/anatomy-hero.png"
                        alt="3D Human Anatomy Model"
                        width={420}
                        height={500}
                        className="relative z-10 object-contain"
                        style={{
                          filter: 'drop-shadow(0 0 60px rgba(255,45,85,0.5)) drop-shadow(0 0 120px rgba(255,45,85,0.25))',
                          width: '100%',
                          height: '100%',
                        }}
                        priority
                      />
                    </motion.div>

                    {/* Title — sits on top of the anatomy */}
                    <div className="relative z-[5] px-6 pt-4">
                      <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-4xl md:text-6xl font-black leading-[1.1]"
                        style={{ color: '#1a1a2e' }}
                      >
                        Medical<br/>Dashboard
                      </motion.h1>

                      {/* Patient vitals — top right */}
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.8 }}
                        className="absolute top-4 right-6 flex gap-6"
                      >
                        {[
                          { value: 'O+', label: 'Blood' },
                          { value: '186cm', label: 'Height' },
                          { value: '90kg', label: 'Weight' },
                        ].map((stat) => (
                          <div key={stat.label} className="text-center">
                            <p className="text-lg font-bold" style={{ color: '#1a1a2e' }}>{stat.value}</p>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{stat.label}</p>
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Metric cards row — overlays partially on the anatomy */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 1 }}
                      className="relative z-[10] flex gap-3 px-6 mt-44"
                    >
                      {[
                        { label: 'SHBG', value: 'U0', low: '<25', high: '>180', barColor: '#FF2D55', barWidth: '45%' },
                        { label: 'Testosterone', value: '0.00', low: '<0.15', high: '>0.49', barColor: '#6366F1', barWidth: '60%' },
                        { label: 'Cortisol', value: '000', low: '<5.0', high: '>25.0', barColor: '#10B981', barWidth: '30%' },
                      ].map((card) => (
                        <div
                          key={card.label}
                          className="flex-1 py-3 px-4 rounded-xl"
                          style={{
                            background: 'rgba(255,255,255,0.82)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(0,0,0,0.05)',
                          }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-gray-400 uppercase tracking-wider">{card.label}</span>
                            <div className="w-10 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                              <div className="h-full rounded-full" style={{ width: card.barWidth, background: card.barColor }} />
                            </div>
                          </div>
                          <p className="text-xl font-bold" style={{ color: '#1a1a2e' }}>{card.value}</p>
                          <div className="flex justify-between mt-0.5">
                            <span className="text-[9px] text-gray-300">{card.low}</span>
                            <span className="text-[9px] text-gray-300">{card.high}</span>
                          </div>
                        </div>
                      ))}
                    </motion.div>

                    {/* Data table — overlays below */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 1.2 }}
                      className="relative z-[10] mx-6 mt-4 rounded-xl overflow-hidden"
                      style={{
                        background: 'rgba(255,255,255,0.88)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(0,0,0,0.05)',
                      }}
                    >
                      <table className="w-full text-left">
                        <thead>
                          <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                            {['Indicator', 'Type', 'Low', 'Result', 'High', 'Status'].map((h) => (
                              <th key={h} className="px-3 py-2.5 text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {indicators.map((row, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                              <td className="px-3 py-2 text-xs font-semibold text-gray-700">{row.name}</td>
                              <td className="px-3 py-2">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-500 font-medium">
                                  {row.type}
                                </span>
                              </td>
                              <td className="px-3 py-2 text-xs text-gray-400">{row.low}</td>
                              <td className="px-3 py-2 text-xs font-semibold text-gray-700">{row.result}</td>
                              <td className="px-3 py-2 text-xs text-gray-400">{row.high}</td>
                              <td className="px-3 py-2">
                                <StatusBadge status={row.status} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
