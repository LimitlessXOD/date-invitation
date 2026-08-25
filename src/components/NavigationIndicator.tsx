import React from 'react';
import { ScreenStage } from '../types';

interface NavigationIndicatorProps {
  currentStage: ScreenStage;
}

const STAGES: ScreenStage[] = [
  'intro',
  'question',
  'genre-select',
  'agreement',
  'number-joke',
  'availability',
  'cinema-flow',
  'summary',
  'confirmation',
];

export const NavigationIndicator: React.FC<NavigationIndicatorProps> = ({ currentStage }) => {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#090807]/90 border-b border-stone-800/80">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        <span
          className="creepy-title text-xs sm:text-sm text-stone-200"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Special Invitation
        </span>
      </div>

      {/* Subtle Step Dots */}
      <div className="flex items-center gap-1.5">
        {STAGES.map((stage, idx) => {
          const isActive = idx === currentIndex;
          const isPassed = idx < currentIndex;

          return (
            <div
              key={stage}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                isActive
                  ? 'w-6 bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_8px_rgba(225,29,72,0.6)]'
                  : isPassed
                  ? 'w-2.5 bg-rose-900/70'
                  : 'w-1.5 bg-neutral-800'
              }`}
            />
          );
        })}
      </div>
    </header>
  );
};
