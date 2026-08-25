import React from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, Clock, Film, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import { MovieGenre, TimePreference } from '../types';
import { DrippingBorder } from './DrippingBorder';
import { formatDateString } from '../utils/dateUtils';
import { GENRE_LIST } from './GenreSelectionScreen';

interface DatePlanSummaryScreenProps {
  movieGenre: MovieGenre;
  selectedDates: string[];
  timePreference: TimePreference;
  onLockIn: () => void;
}

export const DatePlanSummaryScreen: React.FC<DatePlanSummaryScreenProps> = ({
  movieGenre,
  selectedDates,
  timePreference,
  onLockIn,
}) => {
  const genreData = GENRE_LIST.find((g) => g.id === movieGenre);
  const sortedDates = [...selectedDates].sort();

  const formattedDateList =
    sortedDates.length > 0
      ? sortedDates.map((d) => formatDateString(d)).join(', ')
      : 'Date to be confirmed';

  const planItems = [
    {
      icon: <Calendar className="w-5 h-5 text-rose-400" />,
      label: 'Date',
      value: formattedDateList,
      badge: sortedDates.length > 1 ? `${sortedDates.length} options` : undefined,
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      label: 'Time',
      value: `${timePreference} Screening`,
    },
    {
      icon: <Film className="w-5 h-5 text-purple-400" />,
      label: 'Genre',
      value: `${genreData?.icon || '🎬'} ${genreData?.name || 'Selected Feature'}`,
      sub: genreData?.isHorror ? 'Survival protocol active' : undefined,
    },
    {
      icon: <MapPin className="w-5 h-5 text-emerald-400" />,
      label: 'Cinema Location',
      value: 'Ster-Kinekor — The Grove',
      sub: 'Windhoek, Namibia',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_55px_rgba(225,29,72,0.3)]"
      >
        <DrippingBorder position="top" />

        {/* Top Tag */}
        <div className="text-center mb-2 mt-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full bg-rose-950/70 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-wider uppercase shadow-[0_0_15px_rgba(225,29,72,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span>Itinerary Overview</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-1"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            YOUR DATE PLAN <span className="text-rose-500">❤️</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-light">
            Everything is set. Ready to make it official?
          </p>
        </div>

        {/* Plan Items List */}
        <div className="space-y-3 mb-7">
          {planItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.12, duration: 0.5 }}
              className="p-3.5 sm:p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 flex items-center justify-between hover:border-rose-900/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                    {item.label}
                  </span>
                  <p className="text-sm sm:text-base font-semibold text-neutral-100">
                    {item.value}
                  </p>
                  {item.sub && (
                    <span className="text-[11px] text-rose-400 font-light block">
                      {item.sub}
                    </span>
                  )}
                </div>
              </div>

              {item.badge && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300">
                  {item.badge}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Lock It In Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <button
            id="summary-lock-in-btn"
            onClick={onLockIn}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-lg shadow-[0_0_35px_rgba(225,29,72,0.55)] hover:shadow-[0_0_45px_rgba(225,29,72,0.8)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
            <span className="tracking-wide">Lock It In ❤️</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
