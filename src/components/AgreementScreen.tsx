import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileSignature, ShieldCheck, CheckCircle2, Film, Sparkles } from 'lucide-react';
import { MovieGenre } from '../types';
import { DrippingBorder } from './DrippingBorder';
import { MiniDrip } from './MiniDrip';
import { GENRE_LIST } from './GenreSelectionScreen';

interface AgreementScreenProps {
  genre: MovieGenre;
  onAgree: () => void;
}

const HORROR_RULES = [
  '1. You are responsible for choosing the horror movie. 👻',
  '2. If I get scared, you saw nothing.',
  '3. Hiding behind you is completely acceptable.',
  '4. If I scream, we\'re pretending it never happened.',
  '5. If you laugh at me, I\'m remembering that. 😭',
  '6. You are officially responsible for my survival.',
];

export const AgreementScreen: React.FC<AgreementScreenProps> = ({ genre, onAgree }) => {
  const [checkedRules, setCheckedRules] = useState<number[]>([0, 1, 2, 3, 4, 5]);

  const isHorror = genre === 'horror';
  const genreData = GENRE_LIST.find((g) => g.id === genre);

  const toggleRule = (index: number) => {
    setCheckedRules((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-lg w-full glass-classified rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.3)]"
      >
        <DrippingBorder position="top" />

        {/* Protocol document tag */}
        <div className="flex items-center justify-between mb-4 border-b border-rose-900/40 pb-3 mt-2">
          <div className="flex items-center gap-2">
            <FileSignature className="w-5 h-5 text-rose-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
              Protocol #{isHorror ? '666-HORROR' : '777-CINEMA'}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-red-950/90 border border-red-800/60 text-red-300">
            Binding Terms
          </span>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl sm:text-2xl font-bold tracking-wider text-neutral-100 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {isHorror
              ? 'Horror Movie Survival Agreement'
              : `${genreData?.name.toUpperCase()} MOVIE PROTOCOL`}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-xs sm:text-sm mt-1"
          >
            {isHorror
              ? 'Before we continue, there are a few rules:'
              : 'Terms and conditions for this screening:'}
          </motion.p>
        </div>

        {/* Content Section: Horror full rules VS Non-horror custom card */}
        {isHorror ? (
          <div className="space-y-2.5 mb-7">
            {HORROR_RULES.map((rule, idx) => {
              const isChecked = checkedRules.includes(idx);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  onClick={() => toggleRule(idx)}
                  className={`relative overflow-hidden p-3 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 cursor-pointer group ${
                    isChecked
                      ? 'bg-neutral-900/80 border-rose-900/50 text-neutral-200 shadow-[0_0_12px_rgba(225,29,72,0.15)]'
                      : 'bg-neutral-950/40 border-neutral-850 text-neutral-400'
                  }`}
                >
                  {isChecked && <MiniDrip position="bottom" intensity="subtle" count={2} />}
                  <div
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                      isChecked
                        ? 'text-rose-400'
                        : 'text-neutral-600 group-hover:text-neutral-400'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 fill-rose-950/80" />
                  </div>
                  <span className="font-light leading-relaxed flex-1">{rule}</span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden p-5 rounded-2xl bg-neutral-900/80 border border-rose-900/40 text-center mb-7 space-y-3"
          >
            <MiniDrip position="bottom" intensity="normal" count={3} />
            <div className="w-12 h-12 rounded-full bg-rose-950/70 border border-rose-800/60 flex items-center justify-center mx-auto text-2xl">
              {genreData?.icon || '🎬'}
            </div>
            <h3
              className="text-lg font-semibold text-white"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {genreData?.agreementText}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              By proceeding, you guarantee optimal movie snacks, zero spoilers, and an enjoyable cinema experience.
            </p>
          </motion.div>
        )}

        {/* Agreement Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isHorror ? 1.0 : 0.5 }}
          className="text-center"
        >
          <button
            id="agreement-agree-btn"
            onClick={onAgree}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-base shadow-[0_0_30px_rgba(225,29,72,0.45)] hover:shadow-[0_0_40px_rgba(225,29,72,0.65)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
          >
            <ShieldCheck className="w-5 h-5 text-rose-200 group-hover:scale-110 transition-transform" />
            <span className="tracking-wide">I AGREE 😌</span>
          </button>
          <p className="text-[11px] text-neutral-500 mt-2 font-mono">
            {isHorror
              ? '*Non-compliance will result in loud audible gasps in the cinema.'
              : '*Official agreement recorded.'}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
