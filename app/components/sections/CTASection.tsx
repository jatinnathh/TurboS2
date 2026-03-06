'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('../3d/ParticleField'), { ssr: false });

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 md:py-40 px-6 overflow-hidden">
      {/* Particle background */}
      <ParticleField />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          Ready to Transform
          <br />
          <span className="gradient-text">Hospital Management?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Join leading hospitals leveraging real-time analytics, AI-driven insights, 
          and seamless department coordination.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button className="glow-btn text-lg px-10 py-4">Start Free Trial</button>
          <button className="glow-btn-outline text-lg px-10 py-4">Schedule Demo</button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 mt-32 pt-8 max-w-6xl mx-auto"
        style={{ borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, var(--cyan), var(--purple))' }}
            >
              T2
            </div>
            <span className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
              TurboS2
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {['Features', 'Analytics', 'Departments', 'Pricing', 'Support'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            &copy; 2026 TurboS2. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </section>
  );
}
