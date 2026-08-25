import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Check, Sparkles, ArrowRight, ShieldAlert, Ghost } from 'lucide-react';
import { MovieGenre, GenreOption } from '../types';
import { DrippingBorder } from './DrippingBorder';
import { MiniDrip } from './MiniDrip';

interface GenreSelectionScreenProps {
  onSelectGenre: (genre: MovieGenre) => void;
}

export const GENRE_LIST: GenreOption[] = [
  {
    id: 'horror',
    label: '👻 Horror',
    name: 'Horror',
    icon: '👻',
    tagline: 'Your certified obsession (Cardiac arrest incoming)',
    isHorror: true,
    selectedMessage: 'Of course you picked this. 😭',
    subMessage: "Guess who's going to be hiding behind you? 💀",
    agreementText: 'You are officially responsible for my survival.',
  },
  {
    id: 'comedy',
    label: '😂 Comedy',
    name: 'Comedy',
    icon: '😂',
    tagline: 'Safe, funny & low heart attack probability',
    selectedMessage: "Okay, at least there's a lower chance I'll embarrass myself.",
    subMessage: 'Good choice. At least one of us will be laughing. 🍿',
    agreementText: 'Good choice. At least one of us will be laughing.',
  },
  {
    id: 'romance',
    label: '❤️ Romance',
    name: 'Romance',
    icon: '❤️',
    tagline: 'Cozy, emotional & dangerously charming',
    selectedMessage: "Oh... so we're going THAT route? 👀",
    subMessage: 'I see what you did there. I like your style.',
    agreementText: 'Interesting... 👀',
  },
  {
    id: 'action',
    label: '🔥 Action',
    name: 'Action',
    icon: '🔥',
    tagline: 'High adrenaline, loud explosions, popcorn fuel',
    selectedMessage: 'Alright, I see you.',
    subMessage: 'Adrenaline pumped and ready.',
    agreementText: "Alright, let's do this.",
  },
  {
    id: 'thriller',
    label: '🕵️ Thriller',
    name: 'Thriller',
    icon: '🕵️',
    tagline: 'Mind games, edge-of-seat plot twists',
    selectedMessage: 'Hopefully I survive this one.',
    subMessage: 'My nerves are already in question.',
    agreementText: 'Hopefully neither of us regrets this.',
  },
  {
    id: 'animation',
    label: '✨ Animation',
    name: 'Animation',
    icon: '✨',
    tagline: 'Wholesome, visual magic & pure vibes',
    selectedMessage: 'Honestly... valid choice.',
    subMessage: 'Studio quality aesthetic appreciation.',
    agreementText: 'Okay, I respect it.',
  },
  {
    id: 'drama',
    label: '🎭 Drama',
    name: 'Drama',
    icon: '🎭',
    tagline: 'Deep emotions & award-winning tears',
    selectedMessage: 'Okay, main character.',
    subMessage: 'Prepare yourself for emotional damage.',
    agreementText: 'Prepare yourself for emotional damage.',
  },
  {
    id: 'fantasy',
    label: '🧙 Fantasy',
    name: 'Fantasy',
    icon: '🧙',
    tagline: 'Mythical realms, magic & grand adventure',
    selectedMessage: 'Interesting choice. I respect it.',
    subMessage: "Let's escape reality for a bit.",
    agreementText: "Let's escape reality for a bit.",
  },
];

export const GenreSelectionScreen: React.FC<GenreSelectionScreenProps> = ({ onSelectGenre }) => {
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre | null>(null);

  const selectedData = GENRE_LIST.find((g) => g.id === selectedGenre);

  const handleSelect = (genreId: MovieGenre) => {
    setSelectedGenre(genreId);
  };

  const handleContinue = () => {
    if (selectedGenre) {
      onSelectGenre(selectedGenre);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 text-center select-none py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.25)]"
      >
        <DrippingBorder position="top" />

        {/* Top badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.2 rounded-full bg-rose-950/70 border border-rose-800/50 text-rose-300 text-xs font-mono tracking-wider mb-4 uppercase shadow-[0_0_15px_rgba(225,29,72,0.25)] mt-2">
          <Film className="w-3.5 h-3.5 text-rose-400" />
          <span>Cinematic Protocol</span>
        </div>

        {/* Header */}
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 mb-1"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Okay... what are we watching? <span className="inline-block animate-pulse">👀</span>
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm mb-6 font-light">
          I already know what you're probably going to choose...
        </p>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 text-left">
          {GENRE_LIST.map((genre) => {
            const isSelected = selectedGenre === genre.id;
            const isHorror = genre.isHorror;

            return (
              <motion.div
                key={genre.id}
                id={`genre-card-${genre.id}`}
                onClick={() => handleSelect(genre.id)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group ${
                  isHorror
                    ? isSelected
                      ? 'bg-rose-950/90 border-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.6)] ring-2 ring-rose-400'
                      : 'bg-gradient-to-b from-neutral-950/90 via-neutral-900/90 to-rose-950/40 border-rose-900/60 hover:border-rose-500/80 shadow-[0_0_20px_rgba(225,29,72,0.2)] animate-heartbeat'
                    : isSelected
                    ? 'bg-neutral-850/95 border-rose-500 shadow-[0_0_25px_rgba(225,29,72,0.4)] ring-2 ring-rose-500/60'
                    : 'bg-neutral-900/70 border-neutral-800/80 hover:bg-neutral-850/80 hover:border-neutral-700'
                }`}
              >
                {/* Horror card special dripping top glow */}
                {isHorror && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 opacity-90 shadow-[0_0_10px_rgba(225,29,72,0.9)]" />
                )}

                {/* Blood drip accent — more intense when selected / horror */}
                <MiniDrip
                  position="bottom"
                  intensity={isSelected ? 'strong' : isHorror ? 'normal' : 'subtle'}
                  count={isSelected ? 4 : 3}
                />

                {/* Selection checkmark badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose-600 border border-rose-300 flex items-center justify-center text-white shadow-[0_0_10px_rgba(225,29,72,0.8)] z-10"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl sm:text-2xl">{genre.icon}</span>
                    {isHorror && !isSelected && (
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-900/60 text-rose-300 border border-rose-700/50">
                        Obsession
                      </span>
                    )}
                  </div>
                  <h3
                    className={`text-sm sm:text-base font-semibold block transition-colors ${
                      isSelected ? 'text-white' : 'text-neutral-100 group-hover:text-rose-200'
                    }`}
                  >
                    {genre.name}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight mt-1">
                    {genre.tagline}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Genre Response Feedback Card */}
        <div className="min-h-[76px] mb-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {selectedData ? (
              <motion.div
                key={selectedData.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`p-4 rounded-2xl border max-w-md w-full text-center ${
                  selectedData.isHorror
                    ? 'bg-rose-950/80 border-rose-600/70 shadow-[0_0_30px_rgba(225,29,72,0.4)] text-rose-100'
                    : 'bg-neutral-900/90 border-neutral-750 text-neutral-200 shadow-[0_0_20px_rgba(0,0,0,0.4)]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-sm sm:text-base font-semibold text-white mb-1">
                  <span>{selectedData.selectedMessage}</span>
                </div>
                {selectedData.subMessage && (
                  <p className="text-xs sm:text-sm text-rose-300 font-light italic">
                    "{selectedData.subMessage}"
                  </p>
                )}
              </motion.div>
            ) : (
              <p className="text-xs text-neutral-500 font-mono italic">
                (Tap any genre card to lock in our fate)
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Continue Button */}
        <div>
          <button
            id="genre-continue-btn"
            onClick={handleContinue}
            disabled={!selectedGenre}
            className={`group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] ${
              selectedGenre
                ? 'bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-[0_0_30px_rgba(225,29,72,0.5)] cursor-pointer'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span className="tracking-wide">Continue →</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
