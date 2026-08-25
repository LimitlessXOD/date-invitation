import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenStage, MovieGenre, TimePreference } from './types';
import { AnimatedBackground } from './components/AnimatedBackground';
import { NavigationIndicator } from './components/NavigationIndicator';
import { IntroScreen } from './components/IntroScreen';
import { DateQuestionScreen } from './components/DateQuestionScreen';
import { GenreSelectionScreen } from './components/GenreSelectionScreen';
import { AgreementScreen } from './components/AgreementScreen';
import { NumberJokeScreen } from './components/NumberJokeScreen';
import { AvailabilityPickerScreen } from './components/AvailabilityPickerScreen';
import { CinemaSectionScreen } from './components/CinemaSectionScreen';
import { DatePlanSummaryScreen } from './components/DatePlanSummaryScreen';
import { FinalConfirmationScreen } from './components/FinalConfirmationScreen';

export default function App() {
  const [currentStage, setCurrentStage] = useState<ScreenStage>('intro');
  const [movieGenre, setMovieGenre] = useState<MovieGenre>('horror');
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [timePreference, setTimePreference] = useState<TimePreference>('Evening');
  const [themeShift, setThemeShift] = useState(false);

  // Toggle date selection (allows selecting one or multiple days seamlessly)
  const handleToggleDate = (formattedDate: string) => {
    setSelectedDates((prev) =>
      prev.includes(formattedDate)
        ? prev.filter((d) => d !== formattedDate)
        : [...prev, formattedDate]
    );
  };

  const handleRestart = () => {
    setCurrentStage('intro');
    setMovieGenre('horror');
    setSelectedDates([]);
    setTimePreference('Evening');
    setThemeShift(false);
  };

  // Determine ambient background intensity based on section
  const backgroundIntensity =
    currentStage === 'genre-select' || currentStage === 'agreement'
      ? movieGenre === 'horror'
        ? 'horror'
        : 'subtle'
      : currentStage === 'availability'
      ? 'warm'
      : currentStage === 'confirmation'
      ? 'celebrate'
      : 'subtle';

  return (
    <div className={`spooky-page theme-${movieGenre} relative min-h-screen text-neutral-100 flex flex-col justify-between overflow-x-hidden font-sans`}>
      {/* Dynamic Animated Canvas & Ambient Glows */}
      <AnimatedBackground intensity={backgroundIntensity} genre={movieGenre} />

      <AnimatePresence>
        {themeShift && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.3, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, times: [0, 0.18, 0.38, 0.62, 1] }}
            className="genre-glitch fixed inset-0 z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Sleek top navigation */}
      <NavigationIndicator currentStage={currentStage} />

      {/* Main Interactive Stage Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(1rem+env(safe-area-inset-bottom))] px-3 sm:px-6">
        <AnimatePresence mode="wait">
          {currentStage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <IntroScreen onContinue={() => setCurrentStage('question')} />
            </motion.div>
          )}

          {currentStage === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <DateQuestionScreen onYes={() => setCurrentStage('genre-select')} />
            </motion.div>
          )}

          {currentStage === 'genre-select' && (
            <motion.div
              key="genre-select"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <GenreSelectionScreen
                onSelectGenre={(genre) => {
                  setMovieGenre(genre);
                  if (genre !== 'horror') {
                    setThemeShift(true);
                    window.setTimeout(() => setThemeShift(false), 820);
                  }
                  setCurrentStage('agreement');
                }}
              />
            </motion.div>
          )}

          {currentStage === 'agreement' && (
            <motion.div
              key="agreement"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <AgreementScreen
                genre={movieGenre}
                onAgree={() => setCurrentStage('number-joke')}
              />
            </motion.div>
          )}

          {currentStage === 'number-joke' && (
            <motion.div
              key="number-joke"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <NumberJokeScreen onContinue={() => setCurrentStage('availability')} />
            </motion.div>
          )}

          {currentStage === 'availability' && (
            <motion.div
              key="availability"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <AvailabilityPickerScreen
                selectedDates={selectedDates}
                onToggleDate={handleToggleDate}
                timePreference={timePreference}
                onChangeTime={setTimePreference}
                onContinue={() => setCurrentStage('cinema-flow')}
              />
            </motion.div>
          )}

          {currentStage === 'cinema-flow' && (
            <motion.div
              key="cinema-flow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <CinemaSectionScreen onContinue={() => setCurrentStage('summary')} />
            </motion.div>
          )}

          {currentStage === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <DatePlanSummaryScreen
                movieGenre={movieGenre}
                selectedDates={selectedDates}
                timePreference={timePreference}
                onLockIn={() => setCurrentStage('confirmation')}
              />
            </motion.div>
          )}

          {currentStage === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <FinalConfirmationScreen
                movieGenre={movieGenre}
                selectedDates={selectedDates}
                timePreference={timePreference}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimalist discreet footer */}
    </div>
  );
}
