import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import { MiniDrip } from './MiniDrip';

interface CustomCalendarProps {
  selectedDates: string[]; // ISO format YYYY-MM-DD
  onToggleDate: (dateStr: string) => void;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CustomCalendar: React.FC<CustomCalendarProps> = ({
  selectedDates,
  onToggleDate,
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [slideDirection, setSlideDirection] = useState<number>(0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isCurrentMonthOrFuture =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month >= today.getMonth());

  const canGoPrev =
    year > today.getFullYear() ||
    (year === today.getFullYear() && month > today.getMonth());

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    setSlideDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    // Limit up to 12 months ahead
    const maxFuture = new Date(today.getFullYear(), today.getMonth() + 12, 1);
    if (new Date(year, month + 1, 1) > maxFuture) return;
    setSlideDirection(1);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays: Array<{
    dayNumber: number;
    dateStr: string;
    isCurrentMonth: boolean;
    isPast: boolean;
    isToday: boolean;
    isWeekend: boolean;
  }> = [];

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevDate = new Date(year, month - 1, d);
    const dateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarDays.push({
      dayNumber: d,
      dateStr,
      isCurrentMonth: false,
      isPast: true,
      isToday: false,
      isWeekend: prevDate.getDay() === 0 || prevDate.getDay() === 6,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(year, month, i);
    dayDate.setHours(0, 0, 0, 0);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const isPast = dayDate < today;
    const isToday = dayDate.getTime() === today.getTime();
    const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6;

    calendarDays.push({
      dayNumber: i,
      dateStr,
      isCurrentMonth: true,
      isPast,
      isToday,
      isWeekend,
    });
  }

  // Next month leading days (fill up to 42 cells or 35 cells)
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= (remainingCells >= 7 ? remainingCells - 7 : remainingCells); i++) {
    const nextDate = new Date(year, month + 1, i);
    const dateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({
      dayNumber: i,
      dateStr,
      isCurrentMonth: false,
      isPast: false,
      isToday: false,
      isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
    });
  }

  return (
    <div className="date-calendar relative overflow-hidden w-full bg-neutral-950/70 border border-rose-950/70 rounded-2xl p-4 sm:p-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
      <MiniDrip position="top" intensity="subtle" count={4} />
      {/* Month Navigation Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-rose-400" />
          <h3
            className="text-base sm:text-lg font-semibold text-neutral-100 tracking-wide"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {MONTH_NAMES[month]} {year}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="calendar-prev-month-btn"
            onClick={handlePrevMonth}
            disabled={!canGoPrev}
            aria-label="Previous month"
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
              canGoPrev
                ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:border-rose-700 cursor-pointer active:scale-95'
                : 'bg-neutral-950 border-neutral-900 text-neutral-700 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            id="calendar-next-month-btn"
            onClick={handleNextMonth}
            aria-label="Next month"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:border-rose-700 transition-colors cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Header */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center">
        {DAY_NAMES.map((dayName, idx) => {
          const isWeekend = idx >= 5;
          return (
            <div
              key={dayName}
              className={`text-[11px] font-mono font-medium tracking-wider py-1 ${
                isWeekend ? 'text-rose-400' : 'text-neutral-400'
              }`}
            >
              {dayName}
            </div>
          );
        })}
      </div>

      {/* Calendar Days Animated Grid */}
      <div className="relative overflow-hidden min-h-[220px]">
        <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
          <motion.div
            key={`${year}-${month}`}
            custom={slideDirection}
            initial={{ opacity: 0, x: slideDirection * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: slideDirection * -40 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="grid grid-cols-7 gap-1 sm:gap-1.5"
          >
            {calendarDays.map((day, idx) => {
              const isSelected = selectedDates.includes(day.dateStr);
              const isDisabled = day.isPast || !day.isCurrentMonth;

              return (
                <div key={`${day.dateStr}-${idx}`} className="flex items-center justify-center">
                  <motion.button
                    id={`cal-day-${day.dateStr}`}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => onToggleDate(day.dateStr)}
                    whileHover={!isDisabled ? { scale: 1.12 } : {}}
                    whileTap={!isDisabled ? { scale: 0.92 } : {}}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-medium text-xs sm:text-sm flex flex-col items-center justify-center relative transition-all duration-200 ${
                      isDisabled
                        ? 'text-neutral-700 cursor-not-allowed opacity-30 pointer-events-none'
                        : isSelected
                        ? 'bg-gradient-to-br from-rose-600 to-red-700 text-white font-bold shadow-[0_0_18px_rgba(225,29,72,0.8)] border border-rose-300 ring-2 ring-rose-400/80 z-10'
                        : day.isToday
                        ? 'bg-neutral-900 border border-rose-500/70 text-rose-300 hover:bg-neutral-800'
                        : day.isWeekend
                        ? 'bg-neutral-900/80 border border-neutral-800/80 text-neutral-200 hover:bg-neutral-800 hover:border-rose-900/60'
                        : 'bg-neutral-900/50 border border-neutral-850/60 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span>{day.dayNumber}</span>

                    {/* Today indicator dot */}
                    {day.isToday && !isSelected && (
                      <span className="w-1 h-1 rounded-full bg-rose-500 absolute bottom-1" />
                    )}

                    {/* Tiny drip under selected day */}
                    {isSelected && (
                      <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[3px] h-2 rounded-b-full bg-gradient-to-b from-rose-500 to-red-800 opacity-90 shadow-[0_0_4px_rgba(225,29,72,0.8)]" />
                    )}

                    {/* Subtle pulse star for selected */}
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]"
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-3 pt-2.5 border-t border-neutral-850 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(225,29,72,0.8)]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full border border-rose-500/70" />
          <span>Today</span>
        </div>
        <span className="text-neutral-500 font-mono">Multiple picks ok</span>
      </div>
    </div>
  );
};
