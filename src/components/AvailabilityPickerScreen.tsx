import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Sun, Moon, Sparkles, X, ArrowRight } from 'lucide-react';
import { TimePreference } from '../types';
import { CustomCalendar } from './CustomCalendar';
import { DrippingBorder } from './DrippingBorder';
import { MiniDrip } from './MiniDrip';
import { formatDateString } from '../utils/dateUtils';

interface AvailabilityPickerScreenProps {
  selectedDates: string[];
  onToggleDate: (dateStr: string) => void;
  timePreference: TimePreference;
  onChangeTime: (time: TimePreference) => void;
  onContinue: () => void;
}

const TIME_OPTIONS: Array<{
  id: TimePreference;
  label: string;
  sub: string;
  icon: React.ReactNode;
}> = [
  {
    id: 'Afternoon',
    label: 'Afternoon',
    sub: 'Matinee & coffee vibe',
    icon: <Sun className="w-4 h-4 text-amber-400" />,
  },
  {
    id: 'Evening',
    label: 'Evening',
    sub: 'Peak cinema atmosphere',
    icon: <Moon className="w-4 h-4 text-rose-400" />,
  },
  {
    id: "I'm flexible",
    label: "I'm flexible",
    sub: 'Anytime works for me',
    icon: <Sparkles className="w-4 h-4 text-pink-400" />,
  },
];

export const AvailabilityPickerScreen: React.FC<AvailabilityPickerScreenProps> = ({
  selectedDates,
  onToggleDate,
  timePreference,
  onChangeTime,
  onContinue,
}) => {
  // Sort selected dates chronologically
  const sortedDates = [...selectedDates].sort();

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-3 sm:px-4 select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full glass-panel-glow rounded-3xl p-5 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.25)]"
      >
        <DrippingBorder position="top" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full bg-rose-950/70 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-wider mb-3 uppercase shadow-[0_0_15px_rgba(225,29,72,0.25)] mt-2">
          <Calendar className="w-3.5 h-3.5 text-rose-400" />
          <span>Timeline Coordinator</span>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-1"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            When are you free? <span className="inline-block animate-pulse">👀</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-light">
            Pick a date that works for you 👀
          </p>
        </div>

        {/* Custom Calendar */}
        <div className="mb-5">
          <CustomCalendar
            selectedDates={selectedDates}
            onToggleDate={onToggleDate}
          />
        </div>

        {/* Selected Dates Display Chips */}
        <div className="min-h-[50px] mb-5">
          <AnimatePresence mode="wait">
            {sortedDates.length > 0 ? (
              <motion.div
                key="selected-dates-list"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3.5 rounded-2xl bg-neutral-900/80 border border-rose-900/50 relative overflow-hidden"
              >
                <MiniDrip position="bottom" intensity="normal" count={3} />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-rose-300 flex items-center gap-1.5">
                    <span>
                      {sortedDates.length === 1
                        ? 'This works for me 👀'
                        : 'These work for me 👀'}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-950 border border-rose-800 text-[10px]">
                      {sortedDates.length} {sortedDates.length === 1 ? 'day' : 'days'}
                    </span>
                  </span>
                  <span className="text-[10px] text-neutral-400">Tap to remove</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {sortedDates.map((dateStr) => (
                    <motion.button
                      key={dateStr}
                      layout
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      onClick={() => onToggleDate(dateStr)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/80 border border-rose-700/60 text-xs text-rose-200 hover:bg-rose-900 transition-colors group cursor-pointer shadow-[0_0_10px_rgba(225,29,72,0.2)]"
                    >
                      <span>{formatDateString(dateStr)}</span>
                      <X className="w-3 h-3 text-rose-400 group-hover:text-white" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <div className="p-3 rounded-xl bg-neutral-950/40 border border-neutral-850 text-center">
                <p className="text-xs text-neutral-400 italic">
                  Select one or more dates on the calendar above.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Time Preference Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Time Preference</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {TIME_OPTIONS.map((option) => {
              const isSelected = timePreference === option.id;
              return (
                <button
                  key={option.id}
                  id={`time-pref-${option.id.toLowerCase().replace(/[^a-z]/g, '')}`}
                  type="button"
                  onClick={() => onChangeTime(option.id)}
                  className={`relative overflow-hidden p-2.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-rose-950/90 to-neutral-900 border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.35)] ring-1 ring-rose-400/60'
                      : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:bg-neutral-850 hover:border-neutral-700'
                  }`}
                >
                  {isSelected && <MiniDrip position="bottom" intensity="strong" count={2} />}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-neutral-200">
                      {option.label}
                    </span>
                    {option.icon}
                  </div>
                  <span className="text-[10px] text-neutral-400 block leading-tight">
                    {option.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="text-center mb-6">
          <p className="text-xs text-neutral-400 italic">
            Don't worry, I'm not judging your schedule. 👀
          </p>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            id="availability-continue-btn"
            onClick={onContinue}
            disabled={selectedDates.length === 0}
            className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] ${
              selectedDates.length > 0
                ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-[0_0_30px_rgba(225,29,72,0.5)] cursor-pointer'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span className="tracking-wide">Continue →</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
