'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'The analytics dashboard has completely transformed how we manage our hospital. We can now make data-driven decisions in real-time.',
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Medical Officer',
    hospital: 'Metropolitan General Hospital',
    initials: 'SM',
    color: 'var(--cyan)',
  },
  {
    quote: 'Bed occupancy insights and department load monitoring have reduced our patient wait times by over 40%. Truly remarkable.',
    name: 'James Rodriguez',
    role: 'Hospital Administrator',
    hospital: 'Central City Medical Center',
    initials: 'JR',
    color: 'var(--purple)',
  },
  {
    quote: 'The inter-department communication features and live activity feeds keep our entire staff aligned and responsive.',
    name: 'Dr. Emily Chen',
    role: 'Head of Neurology',
    hospital: 'Pacific Health Systems',
    initials: 'EC',
    color: 'var(--emerald)',
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 px-6">
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
            Trusted by <span className="gradient-text">Leaders</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Hospital administrators and medical professionals trust our platform.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-8 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Quote mark */}
              <div
                className="absolute top-4 right-6 text-6xl font-serif leading-none opacity-10"
                style={{ color: t.color }}
              >
                &ldquo;
              </div>

              {/* Quote */}
              <p className="text-sm leading-relaxed mb-8 relative z-10" style={{ color: 'var(--text-secondary)' }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.hospital}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
