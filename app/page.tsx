'use client';

import { motion, useScroll } from 'framer-motion';
import Link from 'next/link';
import HeroSection from './components/sections/HeroSection';
import StatsSection from './components/sections/StatsSection';
import FeaturesSection from './components/sections/FeaturesSection';
import DepartmentsSection from './components/sections/DepartmentsSection';
import AnalyticsPreview from './components/sections/AnalyticsPreview';
import TestimonialsSection from './components/sections/TestimonialsSection';
import CTASection from './components/sections/CTASection';

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <main className="relative">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
        style={{
          scaleX: scrollYProgress,
          background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
          boxShadow: '0 0 10px var(--cyan-glow)',
        }}
      />

      {/* Floating nav */}
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full flex items-center gap-6"
        style={{
          background: 'rgba(5, 8, 22, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ background: 'linear-gradient(135deg, var(--coral), #FF6B8A)' }}
          >
            T2
          </div>
          <span className="text-sm font-semibold hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            TurboS2
          </span>
        </div>
        <div className="hidden md:flex items-center gap-5">
          {['Features', 'Departments', 'Analytics', 'Testimonials'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium transition-colors hover:text-white"
              style={{ color: 'var(--text-muted)' }}
            >
              {item}
            </a>
          ))}
        </div>
        <Link href="/login" className="glow-btn text-xs px-4 py-2 no-underline">
          Dashboard
        </Link>
      </nav>

      {/* Sections */}
      <HeroSection />
      <div className="section-divider" />
      <StatsSection />
      <div className="section-divider" />
      <FeaturesSection />
      <div className="section-divider" />
      <DepartmentsSection />
      <div className="section-divider" />
      <AnalyticsPreview />
      <div className="section-divider" />
      <TestimonialsSection />
      <div className="section-divider" />
      <CTASection />
    </main>
  );
}
