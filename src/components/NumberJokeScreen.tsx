import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, KeyRound } from 'lucide-react';
import { DrippingBorder } from './DrippingBorder';

interface NumberJokeScreenProps {
  onContinue: () => void;
}

export const NumberJokeScreen: React.FC<NumberJokeScreenProps> = ({ onContinue }) => {
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.25)]"
      >
        <DrippingBorder position="top" />

        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full bg-neutral-900/90 border border-neutral-700 text-neutral-300 text-xs font-mono tracking-wider mb-5 uppercase mt-2 shadow-[0_0_15px_rgba(0,0,0,0.4)]">
          <KeyRound className="w-3.5 h-3.5 text-rose-400" />
          <span>Clearance Level 5</span>
        </div>

        <AnimatePresence mode="wait">
          {!answered ? (
            <motion.div
              key="question-state"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2
                className="text-2xl sm:text-3xl font-semibold text-neutral-100 mb-3"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                One last thing...
              </h2>

              <p className="text-neutral-300 text-base sm:text-lg mb-8 leading-relaxed">
                Do you still want to know{' '}
                <span className="text-rose-300 font-medium border-b border-rose-500/50 pb-0.5">
                  who gave me your number?
                </span>
              </p>

              <div className="flex items-center justify-center gap-4">
                <button
                  id="number-joke-yes-btn"
                  onClick={() => setAnswered('yes')}
                  className="cursor-pointer px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium text-base shadow-[0_0_20px_rgba(225,29,72,0.4)] transition-all transform active:scale-95"
                >
                  YES 😭
                </button>

                <button
                  id="number-joke-no-btn"
                  onClick={() => setAnswered('no')}
                  className="cursor-pointer px-6 py-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 font-medium text-base transition-all transform active:scale-95"
                >
                  NO
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="classified-reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              {/* Classified Badge Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-950/90 border-2 border-red-600/80 text-red-300 font-mono text-sm tracking-widest uppercase shadow-[0_0_25px_rgba(220,38,38,0.5)] my-2"
              >
                <Lock className="w-4 h-4 text-red-400" />
                <span>CLASSIFIED INFORMATION</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3
                  className="text-xl sm:text-2xl font-bold text-neutral-100 mb-1"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {answered === 'yes' ? 'Nice try.' : 'Look at you playing it cool. 😂'}
                </h3>
                <p className="text-rose-300 text-base font-light">
                  You are not getting that out of me. 😌
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-300 text-sm shadow-[0_0_15px_rgba(0,0,0,0.3)]"
              >
                <span>...but let's pick </span>
                <span className="font-semibold text-rose-400">when</span>
                <span> you're free.</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="pt-3"
              >
                <button
                  id="number-joke-continue-btn"
                  onClick={onContinue}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
                >
                  <span className="tracking-wide">Continue</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
