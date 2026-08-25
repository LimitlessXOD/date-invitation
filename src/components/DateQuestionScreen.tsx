import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { DrippingBorder } from './DrippingBorder';

interface DateQuestionScreenProps {
  onYes: () => void;
}

const NO_MESSAGES = [
  'You sure? 🤨',
  'Hmm... interesting.',
  "You're really doing this? 😭",
  'Girl, be serious.',
  'You know you wanna say yes.',
  "Okay... I think we've made our decision. 😌",
];

export const DateQuestionScreen: React.FC<DateQuestionScreenProps> = ({ onYes }) => {
  const [noClicks, setNoClicks] = useState<number>(0);
  const [isCelebrating, setIsCelebrating] = useState(false);

  const handleNoClick = () => {
    if (noClicks < 6) {
      setNoClicks((prev) => prev + 1);
    }
  };

  const handleYesClick = () => {
    if (isCelebrating) return;
    setIsCelebrating(true);

    try {
      const count = 220;
      const defaults = {
        origin: { y: 0.7 },
        colors: ['#e11d48', '#f43f5e', '#fda4af', '#fb7185', '#ffffff'],
      };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      };

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      onYes();
    }, 1300);
  };

  const yesScale = 1 + noClicks * 0.18;
  const noScale = Math.max(0.4, 1 - noClicks * 0.11);
  const isNoRemoved = noClicks >= 6;

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full glass-panel-glow rounded-3xl p-7 sm:p-9 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.25)]"
      >
        <DrippingBorder position="top" />

        {/* Decorative badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full bg-rose-950/70 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-wider mb-6 uppercase shadow-[0_0_15px_rgba(225,29,72,0.25)] mt-2">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/30" />
          <span>The Critical Question</span>
        </div>

        {/* The Question Headline */}
        <motion.h2
          key="question-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-100 mb-6 leading-snug"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Would you go on a date with me? <span className="inline-block animate-pulse">👀</span>
        </motion.h2>

        {/* Playful NO message feedback */}
        <div className="min-h-[44px] mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {noClicks > 0 && (
              <motion.div
                key={`no-msg-${noClicks}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`text-sm sm:text-base font-medium px-4 py-2 rounded-xl border flex items-center gap-2 ${
                  isNoRemoved
                    ? 'bg-rose-950/80 text-rose-200 border-rose-700/60 shadow-[0_0_25px_rgba(225,29,72,0.4)]'
                    : 'bg-neutral-900/90 text-rose-300 border-rose-900/50 shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                }`}
              >
                {isNoRemoved && <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />}
                <span>{NO_MESSAGES[Math.min(noClicks - 1, NO_MESSAGES.length - 1)]}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-2 pb-4">
          {/* YES Button */}
          <motion.button
            id="date-question-yes-btn"
            onClick={handleYesClick}
            disabled={isCelebrating}
            animate={{
              scale: yesScale,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 18,
            }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            className={`cursor-pointer group relative flex items-center justify-center gap-2 font-semibold text-white transition-all duration-300 ${
              isNoRemoved
                ? 'w-full py-5 px-8 text-xl rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 shadow-[0_0_45px_rgba(225,29,72,0.8)] animate-pulse ring-2 ring-rose-400'
                : 'px-7 py-3.5 text-base sm:text-lg rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 shadow-[0_0_25px_rgba(225,29,72,0.45)] hover:shadow-[0_0_35px_rgba(225,29,72,0.65)]'
            }`}
          >
            <span>YES</span>
            <Heart className="w-4 h-4 fill-white text-white group-hover:scale-125 transition-transform" />
          </motion.button>

          {/* NO Button (Escalating & shrinking) */}
          <AnimatePresence>
            {!isNoRemoved && (
              <motion.button
                id="date-question-no-btn"
                onClick={handleNoClick}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  scale: noScale,
                  opacity: Math.max(0.5, 1 - noClicks * 0.08),
                }}
                exit={{
                  opacity: 0,
                  scale: 0.1,
                  filter: 'blur(8px)',
                  transition: { duration: 0.4 },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 20,
                }}
                whileHover={{ scale: noScale * 0.96 }}
                whileTap={{ scale: noScale * 0.88 }}
                className="cursor-pointer px-6 py-3 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800/90 font-medium text-sm sm:text-base transition-colors"
              >
                <span>NO 😭</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Playful hint text if NO clicked repeatedly */}
        {noClicks >= 3 && !isNoRemoved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-1 text-xs text-neutral-400 mt-4"
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>The odds are heavily stacked in favor of YES</span>
          </motion.div>
        )}

        {/* Celebrating overlay banner */}
        <AnimatePresence>
          {isCelebrating && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20"
            >
              <motion.div
                animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-16 h-16 rounded-full bg-rose-600/20 border border-rose-500/50 flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(225,29,72,0.6)]"
              >
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
              </motion.div>
              <h3 className="text-xl font-bold text-neutral-100 mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                I knew it! ❤️
              </h3>
              <p className="text-rose-300 text-sm">Preparing movie selection...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
