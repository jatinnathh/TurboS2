'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'admin@mediflow.com' && password === 'admin123') {
      setLoading(true);
      setTimeout(() => router.push('/dashboard'), 600);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #050816 0%, #0a1628 40%, #0d1f3c 100%)' }}
    >
      {/* Ambient glow effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #EC4899 0%, transparent 70%)' }} />
      <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />

      {/* Floating grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-8 sm:p-10"
          style={{
            background: 'rgba(15, 20, 40, 0.8)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(124, 58, 237, 0.15)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 80px rgba(124, 58, 237, 0.08)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-4"
              style={{ background: 'linear-gradient(135deg, #FF2D55, #FF6B8A)', boxShadow: '0 8px 30px rgba(255,45,85,0.3)' }}
            >
              T2
            </motion.div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(148, 163, 184, 0.8)' }}>
              Sign in to MediFlow Admin Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'rgba(148, 163, 184, 0.7)' }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="admin@mediflow.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(124, 58, 237, 0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255,255,255,0.08)')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'rgba(148, 163, 184, 0.7)' }}>
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255,255,255,0.08)'}`,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(124, 58, 237, 0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255,255,255,0.08)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(148, 163, 184, 0.5)' }}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-medium"
                style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#f87171' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
                </svg>
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 relative overflow-hidden disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                boxShadow: '0 8px 30px rgba(124, 58, 237, 0.3)',
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[10px] uppercase tracking-wider" style={{ color: 'rgba(148, 163, 184, 0.4)' }}>Demo Credentials</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Credentials hint */}
          <div
            className="rounded-xl p-4 space-y-2"
            style={{ background: 'rgba(124, 58, 237, 0.06)', border: '1px solid rgba(124, 58, 237, 0.1)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>Email</span>
              <button
                type="button"
                onClick={() => { setEmail('admin@mediflow.com'); setPassword('admin123'); }}
                className="text-[10px] font-semibold transition-colors"
                style={{ color: '#A78BFA' }}
              >
                Auto-fill
              </button>
            </div>
            <p className="text-xs font-mono" style={{ color: 'rgba(167, 139, 250, 0.8)' }}>admin@mediflow.com</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>Password</span>
            </div>
            <p className="text-xs font-mono" style={{ color: 'rgba(167, 139, 250, 0.8)' }}>admin123</p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a href="/" className="text-xs font-medium transition-colors" style={{ color: 'rgba(148, 163, 184, 0.5)' }}>
            ← Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
}
