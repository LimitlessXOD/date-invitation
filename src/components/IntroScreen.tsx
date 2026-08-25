import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';
import { DrippingBorder } from './DrippingBorder';

interface IntroScreenProps {
  onContinue: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.2)]"
      >
        {/* Animated dripping blood accent at the top */}
        <DrippingBorder position="top" />

        {/* Floating badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="quiet-tag inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full text-xs font-mono tracking-wider mb-6 uppercase mt-2"
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Confidential Dispatch</span>
        </motion.div>

        {/* Main message 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="creepy-title text-2xl sm:text-3xl text-stone-100 mb-4"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          I have a proposal for you...
        </motion.h1>

        {/* Message 2 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="text-neutral-400 text-base sm:text-lg mb-4 font-light"
        >
          Don't worry.
        </motion.p>

        {/* Message 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.7 }}
          className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8"
        >
          <span>It's not about </span>
          <span className="text-stone-200 font-medium border-b border-[#7d2b27] pb-0.5">
            who gave me your number.
          </span>
          <span className="ml-1 text-lg">👀</span>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 0.6 }}
        >
          <button
            id="intro-continue-btn"
            onClick={onContinue}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-medium shadow-[0_0_25px_rgba(225,29,72,0.45)] hover:shadow-[0_0_35px_rgba(225,29,72,0.65)] transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
          >
            <span className="tracking-wide">Continue</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};
