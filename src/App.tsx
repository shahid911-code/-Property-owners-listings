/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MashalLogo } from './components/MashalLogo';

type Answer = 'yes' | 'no' | null;

interface AnswersState {
  1: Answer;
  2: Answer;
  3: Answer;
}

const QUESTIONS = [
  'Ye ghar aapka apna hai. Sahi hai?',
  'Ghar Rent ke liye hai, Sale ke liye nahi. Sahi hai?',
  'Ghar Bani Gala ya Barakahu mein hai. Sahi hai?',
];

const WHATSAPP_NUMBER = '923215865387';

export default function App() {
  // step 1, 2, 3: questions
  // step 4: final evaluation (all 'yes' -> WhatsApp screen, any 'no' -> rejection screen)
  const [step, setStep] = useState<number>(1);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [answers, setAnswers] = useState<AnswersState>({
    1: null,
    2: null,
    3: null,
  });

  const currentAnswer = step <= 3 ? answers[step as 1 | 2 | 3] : null;

  const handleSelect = (val: 'yes' | 'no') => {
    if (step <= 3) {
      setAnswers((prev) => ({
        ...prev,
        [step]: val,
      }));
    }
  };

  const handleNext = () => {
    if (step <= 3) {
      const selected = answers[step as 1 | 2 | 3];
      if (selected === null) return;

      // Advance to next question until step 3, then evaluate at step 4
      if (step < 3) {
        setSlideDirection(1);
        setStep((prev) => prev + 1);
      } else if (step === 3) {
        setSlideDirection(1);
        setStep(4);
      }
    }
  };

  const handleBack = () => {
    if (step > 1 && step <= 3) {
      setSlideDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setAnswers({ 1: null, 2: null, 3: null });
    setSlideDirection(-1);
    setStep(1);
  };

  // Keyboard navigation: Y/1 = YES, N/2 = NO, Enter = Next, Backspace = Prev
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (step >= 1 && step <= 3) {
        if (e.key === 'y' || e.key === 'Y' || e.key === '1') {
          handleSelect('yes');
        } else if (e.key === 'n' || e.key === 'N' || e.key === '2') {
          handleSelect('no');
        } else if (e.key === 'Enter') {
          if (currentAnswer !== null) {
            handleNext();
          }
        } else if (e.key === 'Backspace' && step > 1) {
          handleBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, currentAnswer]);

  // Evaluated at the end (Step 4)
  const hasAnyNo =
    answers[1] === 'no' || answers[2] === 'no' || answers[3] === 'no';

  const whatsappMessage = `Salam MashalCore, maine form fill kiya hai. Mera ghar apna hai, rent ke liye hai, aur Bani Gala / Barakahu mein waqe hai. Mujhse raabta karein.`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="h-[100dvh] min-h-[100dvh] w-full bg-white text-black flex flex-col items-center justify-center p-3.5 sm:p-5 overflow-hidden overscroll-none touch-manipulation select-none">
      {/* Mobile-Optimized Perfectly Centered Container */}
      <div className="w-full max-w-[340px] sm:max-w-[370px] flex flex-col items-center justify-center text-center mx-auto my-auto">
        {/* MashalCore Official Logo (Centered & High Priority) */}
        <div className="w-full flex justify-center items-center mb-2.5">
          <MashalLogo size="lg" />
        </div>

        {/* Featured Property Patio Image (Centered, Compact & Super-Fast WebP) */}
        <div className="w-[84%] sm:w-[86%] max-w-[285px] mx-auto mb-3 overflow-hidden rounded-xl border border-neutral-200 shadow-2xs bg-neutral-100 flex items-center justify-center">
          <img
            src="/property_patio.webp"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/property_patio.jpg';
            }}
            alt="Property Rooftop Terrace"
            width={285}
            height={178}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full aspect-[16/10] max-h-[155px] sm:max-h-[170px] object-cover mx-auto"
          />
        </div>

        {/* ================= STEPS 1, 2, 3: QUESTIONS ================= */}
        {step >= 1 && step <= 3 && (
          <div className="w-full flex flex-col items-center justify-center text-center">
            {/* Step Dots: 100% Centered (Only Dots) */}
            <div className="w-full flex items-center justify-center mb-2.5 min-h-[20px]">
              <div className="flex items-center justify-center space-x-2.5 mx-auto">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`inline-block transition-all duration-200 rounded-full ${
                      s === step
                        ? 'w-2.5 h-2.5 bg-black ring-2 ring-neutral-300'
                        : s < step
                        ? 'w-2.5 h-2.5 bg-neutral-600'
                        : 'w-2.5 h-2.5 bg-neutral-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Horizontal Question Text Slider (Centered) */}
            <div className="w-full min-h-[54px] sm:min-h-[58px] flex items-center justify-center text-center mb-2.5 px-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: slideDirection * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 20 }}
                  transition={{ duration: 0.14 }}
                  className="w-full text-center"
                >
                  <h2 className="text-[17px] sm:text-[18px] font-semibold text-black leading-snug text-center">
                    {QUESTIONS[step - 1]}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* YES / NO Side-by-Side Buttons (Centered) */}
            <div className="grid grid-cols-2 gap-3 w-full mb-2.5">
              <button
                type="button"
                onClick={() => handleSelect('yes')}
                className={`h-12 sm:h-13 rounded-lg font-bold text-base sm:text-lg tracking-wider border cursor-pointer transition-all duration-150 active:scale-[0.98] flex items-center justify-center text-center ${
                  currentAnswer === 'yes'
                    ? 'bg-black text-white border-black ring-1 ring-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black active:bg-neutral-50'
                }`}
              >
                YES
              </button>

              <button
                type="button"
                onClick={() => handleSelect('no')}
                className={`h-12 sm:h-13 rounded-lg font-bold text-base sm:text-lg tracking-wider border cursor-pointer transition-all duration-150 active:scale-[0.98] flex items-center justify-center text-center ${
                  currentAnswer === 'no'
                    ? 'bg-black text-white border-black ring-1 ring-black'
                    : 'bg-white text-black border-neutral-300 hover:border-black active:bg-neutral-50'
                }`}
              >
                NO
              </button>
            </div>

            {/* NEXT / CONTINUE Button (Centered) */}
            <button
              type="button"
              disabled={currentAnswer === null}
              onClick={handleNext}
              className={`w-full h-11 sm:h-12 rounded-lg font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-150 flex items-center justify-center text-center select-none ${
                currentAnswer !== null
                  ? 'bg-black text-white hover:bg-neutral-800 active:scale-[0.98] cursor-pointer shadow-xs'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              {step === 3 ? 'CONTINUE' : 'NEXT'}
            </button>

            {/* Small PREVIOUS Button Below NEXT (Allows going back if accidentally clicked) */}
            <div className="w-full min-h-[28px] mt-1.5 flex items-center justify-center">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-xs font-medium text-neutral-400 hover:text-black transition-colors py-1 px-3 cursor-pointer select-none flex items-center justify-center gap-1 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= STEP 4: FINAL EVALUATION AT THE END ================= */}
        {step === 4 && (
          <div className="w-full flex flex-col items-center justify-center text-center mx-auto">
            {!hasAnyNo ? (
              /* SUCCESS: All 3 answered YES */
              <>
                <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mb-2.5 mx-auto">
                  <svg
                    className="w-6 h-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-black mb-1.5 leading-snug text-center">
                  Thank you fill karne k liye!
                </h2>

                <p className="text-sm text-neutral-600 mb-4 leading-relaxed text-center">
                  WhatsApp per raabtha kare
                </p>

                <div className="w-full space-y-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-lg font-semibold text-sm tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all flex items-center justify-center gap-2 uppercase cursor-pointer shadow-sm active:scale-[0.98] text-center"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WHATSAPP KAREIN</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="w-full h-11 rounded-lg font-semibold text-xs tracking-wider bg-white text-neutral-500 border border-neutral-200 hover:text-black hover:border-black transition-all flex items-center justify-center uppercase cursor-pointer text-center"
                  >
                    START OVER
                  </button>
                </div>
              </>
            ) : (
              /* REJECTION: User answered NO to any of the questions */
              <>
                <div className="w-12 h-12 rounded-full border-2 border-neutral-300 flex items-center justify-center mb-2.5 mx-auto">
                  <svg
                    className="w-6 h-6 text-neutral-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                {/* Required Notice Message */}
                <div className="w-full my-2.5 py-4 px-3 bg-neutral-100 border border-neutral-300 rounded-xl text-center">
                  <p className="text-base sm:text-[17px] font-bold text-black leading-snug text-center">
                    Ye service sirf Banigala/Barakahu ke rental property owners ke liay hai
                  </p>
                </div>

                <div className="w-full mt-1.5">
                  <button
                    type="button"
                    onClick={handleRestart}
                    className="w-full h-11 rounded-lg font-semibold text-xs tracking-wider bg-white text-neutral-600 border border-neutral-300 hover:text-black hover:border-black transition-all flex items-center justify-center uppercase cursor-pointer text-center"
                  >
                    DOBARA TRY KAREIN
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
