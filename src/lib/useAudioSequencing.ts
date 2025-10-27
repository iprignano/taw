import { createEffect, createSignal, onCleanup, useContext } from 'solid-js';

import { getAudioContext, playHihats, playKick, playSnare } from './audio';

import { AppContext } from '../components/AppContext/AppContext';

const LOOP_STEPS_LENGTH = 32;

export const useAudioSequencing = () => {
  const context = useContext(AppContext);

  const [intervalId, setIntervalId] = createSignal<NodeJS.Timeout>();

  createEffect(() => {
    if (!context?.isPlaying()) {
      return;
    }

    const interval = setInterval(() => {
      if (context?.currentStep() >= LOOP_STEPS_LENGTH) {
        context?.setCurrentStep(0);
      }

      // Music here
      const time = getAudioContext().currentTime;
      const drumStep = (context?.currentStep() + 1) / 2;

      if (context?.drums.kick[drumStep]) {
        playKick(time);
      }
      if (context?.drums.snare[drumStep]) {
        playSnare(time);
      }
      if (context?.drums.hihats[drumStep]) {
        playHihats(time);
      }

      context?.setCurrentStep((step) => step + 1);
    }, 60_000 / context?.bpm() / 8);
    // 1 minute is 60_000ms
    // `60_000 / bpm` gives us the interval between whole
    //                notes in a minute at the chosen tempo
    // `(60_000 / bpm) / 8` makes that the interval between
    //                      8th notes

    setIntervalId(interval);

    onCleanup(() => {
      clearInterval(intervalId());
    });
  });
};
