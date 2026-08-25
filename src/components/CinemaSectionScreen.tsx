import React from 'react';
import { motion } from 'motion/react';
import { Film, MapPin, ExternalLink, ArrowRight, Popcorn, Sparkles } from 'lucide-react';
import { DrippingBorder } from './DrippingBorder';

interface CinemaSectionScreenProps {
  onContinue: () => void;
}

export const CinemaSectionScreen: React.FC<CinemaSectionScreenProps> = ({ onContinue }) => {
  const STER_KINEKOR_URL =
    'https://www.sterkinekor.com/program?location=the-grove-windhoek';

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.25)]"
      >
        <DrippingBorder position="top" />

        {/* Top tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full bg-rose-950/70 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-wider mb-5 uppercase shadow-[0_0_15px_rgba(225,29,72,0.25)] mt-2">
          <Film className="w-3.5 h-3.5 text-rose-400" />
          <span>Venue & Program</span>
        </div>

        {/* Heading */}
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-2"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Good choice. 😌
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mb-6 font-light">
          Now let's find something worth watching.
        </p>

        {/* Cinema Card */}
        <div className="p-4 rounded-2xl bg-neutral-900/80 border border-rose-900/40 text-left mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-neutral-100">
                Ster-Kinekor — The Grove
              </h3>
              <p className="text-xs text-neutral-400">Windhoek, Namibia</p>
              <div className="flex items-center gap-1 text-[11px] text-rose-400 font-mono mt-1">
                <Popcorn className="w-3 h-3" />
                <span>Large popcorn & snacks included</span>
              </div>
            </div>
          </div>

          {/* External Link button */}
          <a
            id="ster-kinekor-link"
            href={STER_KINEKOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-950/90 border border-rose-800/60 hover:border-rose-500 hover:bg-neutral-900 text-rose-200 hover:text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(225,29,72,0.15)] group"
          >
            <span>🎬 View movies & showtimes</span>
            <ExternalLink className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Continue Button */}
        <div>
          <button
            id="cinema-continue-btn"
            onClick={onContinue}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
          >
            <span className="tracking-wide">Review Date Plan →</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
