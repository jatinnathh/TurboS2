'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DEPARTMENTS, type TimeRange, type Department } from './dataUtils';

interface AnalyticsToolbarProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  department: Department;
  onDepartmentChange: (dept: Department) => void;
  /** Optional: show doctor ranking controls */
  showDoctorRank?: boolean;
  doctorRankOrder?: 'top' | 'bottom';
  onDoctorRankOrderChange?: (order: 'top' | 'bottom') => void;
}

const timeRangeOptions: TimeRange[] = ['Monthly', 'Quarterly', 'Yearly'];

export default function AnalyticsToolbar({
  timeRange, onTimeRangeChange,
  department, onDepartmentChange,
  showDoctorRank, doctorRankOrder, onDoctorRankOrderChange,
}: AnalyticsToolbarProps) {
  const [deptOpen, setDeptOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDeptOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* ── Time Range Segmented Control ── */}
      <div className="relative flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
        {timeRangeOptions.map(opt => {
          const isActive = opt === timeRange;
          return (
            <button
              key={opt}
              onClick={() => onTimeRangeChange(opt)}
              className="relative z-10 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200"
              style={{ color: isActive ? '#fff' : '#6b7280' }}
            >
              {isActive && (
                <motion.div
                  layoutId="timeRangeIndicator"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* ── Department Selector ── */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDeptOpen(!deptOpen)}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-gray-700"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
          </svg>
          {department === 'All' ? 'All Departments' : department}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {deptOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute top-full mt-1 left-0 z-50 bg-white rounded-xl shadow-xl border border-gray-100 py-1 min-w-[180px]"
          >
            {DEPARTMENTS.map(dept => (
              <button
                key={dept}
                onClick={() => { onDepartmentChange(dept); setDeptOpen(false); }}
                className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                  department === dept
                    ? 'bg-purple-50 text-purple-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {dept === 'All' ? 'All Departments' : dept}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Doctor Ranking Toggle ── */}
      {showDoctorRank && onDoctorRankOrderChange && (
        <div className="flex items-center bg-gray-100 rounded-xl p-1 gap-0.5">
          {(['top', 'bottom'] as const).map(order => {
            const isActive = order === doctorRankOrder;
            return (
              <button
                key={order}
                onClick={() => onDoctorRankOrderChange(order)}
                className="relative z-10 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-200"
                style={{ color: isActive ? '#fff' : '#6b7280' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="doctorRankIndicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: order === 'top' ? '#10B981' : '#EF4444' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{order === 'top' ? '▲ Top' : '▼ Bottom'}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
