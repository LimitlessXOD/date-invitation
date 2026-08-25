import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Calendar,
  Clock,
  Film,
  MapPin,
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Shield,
  Lock,
} from 'lucide-react';
import { MovieGenre, TimePreference } from '../types';
import { DrippingBorder } from './DrippingBorder';
import { formatDateString } from '../utils/dateUtils';
import { GENRE_LIST } from './GenreSelectionScreen';

interface FinalConfirmationScreenProps {
  movieGenre: MovieGenre;
  selectedDates: string[];
  timePreference: TimePreference;
  onRestart: () => void;
}

export const FinalConfirmationScreen: React.FC<FinalConfirmationScreenProps> = ({
  movieGenre,
  selectedDates,
  timePreference,
  onRestart,
}) => {
  const [copied, setCopied] = useState(false);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  const isHorror = movieGenre === 'horror';
  const genreData = GENRE_LIST.find((g) => g.id === movieGenre);
  const sortedDates = [...selectedDates].sort();

  const formattedDateStr =
    sortedDates.length > 0
      ? sortedDates.map((d) => formatDateString(d)).join(', ')
      : 'Date to be scheduled';

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#ec4899', '#ffffff'],
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#e11d48', '#f43f5e', '#fb7185', '#ec4899', '#ffffff'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch {
      // safe fallback
    }
  }, []);

  const handleCopySummary = () => {
    const summaryText = `🎬 Our Date is Locked in!\n\n📅 Date(s): ${formattedDateStr}\n🕐 Time: ${timePreference}\n🍿 Genre: ${
      genreData?.icon || '🎬'
    } ${genreData?.name || 'Movie'}\n📍 Venue: Ster-Kinekor (The Grove, Windhoek)\n\n${
      isHorror
        ? "P.S. I'm still expecting you to protect me. 💀"
        : "P.S. You still don't know who gave me your number. 🔒"
    }`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden text-center shadow-[0_0_60px_rgba(225,29,72,0.35)]"
      >
        <DrippingBorder position="top" />

        {/* Floating Heart icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 4, -4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center mx-auto mb-4 mt-2 shadow-[0_0_30px_rgba(225,29,72,0.8)] border border-rose-400"
        >
          <Heart className="w-8 h-8 text-white fill-white" />
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-1"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          IT'S A DATE. <span className="text-rose-500">❤️</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-neutral-300 text-sm sm:text-base mb-6 font-light"
        >
          I'll handle the rest. 😌
        </motion.p>

        {/* Confirmed Details Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-4 rounded-2xl bg-neutral-900/90 border border-rose-900/50 text-left space-y-3 mb-5 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-rose-400">
              Official Reservation Card
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              CONFIRMED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-mono block">
                Movie Genre
              </span>
              <span className="font-semibold text-neutral-200">
                {genreData?.icon} {genreData?.name}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 text-[10px] uppercase font-mono block">
                Screening Time
              </span>
              <span className="font-semibold text-neutral-200">{timePreference}</span>
            </div>

            <div className="col-span-2">
              <span className="text-neutral-400 text-[10px] uppercase font-mono block">
                Date Choice
              </span>
              <span className="font-semibold text-rose-300">{formattedDateStr}</span>
            </div>

            <div className="col-span-2">
              <span className="text-neutral-400 text-[10px] uppercase font-mono block">
                Venue
              </span>
              <span className="text-neutral-300">Ster-Kinekor (The Grove, Windhoek)</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic P.S. Note based on horror vs non-horror */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="p-3.5 rounded-xl bg-neutral-950/70 border border-rose-950 text-xs sm:text-sm text-neutral-300 mb-6 italic"
        >
          {isHorror ? (
            <p className="text-rose-200 font-medium">
              P.S. I'm still expecting you to protect me. 💀
            </p>
          ) : (
            <p className="text-rose-200 font-medium">
              P.S. You still don't know who gave me your number. 🔒
            </p>
          )}
        </motion.div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            id="confirmation-copy-summary-btn"
            onClick={handleCopySummary}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 border border-rose-800/60 hover:bg-neutral-850 hover:border-rose-600 text-rose-200 text-sm font-medium transition-all shadow-[0_0_15px_rgba(225,29,72,0.15)] cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-rose-400" />
                <span>Copy Summary to Send Me 📱</span>
              </>
            )}
          </button>

          {/* Secret Easter Egg toggle */}
          <div className="pt-1">
            <button
              id="confirmation-easter-egg-btn"
              onClick={() => setEasterEggOpen(!easterEggOpen)}
              className="text-[11px] font-mono text-neutral-400 hover:text-rose-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-rose-400" />
              <span>{easterEggOpen ? 'Hide confidential dossier' : 'Top Secret Dossier 👀'}</span>
            </button>

            <AnimatePresence>
              {easterEggOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400 font-mono text-left leading-relaxed"
                >
                  <p className="text-rose-400 font-bold mb-1">DOSSIER #007:</p>
                  <p>
                    Informant identity will strictly be released post-movie over dessert or
                    beverages. No exceptions granted under section 4B of the Date Agreement. 😌
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-2">
            <button
              id="confirmation-replay-btn"
              onClick={onRestart}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Experience</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
