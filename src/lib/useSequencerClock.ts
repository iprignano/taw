import { createEffect, createSignal, onCleanup } from 'solid-js';

const LOOP_STEPS_LENGTH = 32;

type UseSequencerClock = (
  callback: (currentStep: number) => void,
  args: { isPlaying: boolean; bpm: number },
) => void;

export const useSequencerClock: UseSequencerClock = (callback, { isPlaying, bpm }) => {
  const [currentStep, setCurrentStep] = createSignal(0);
  const [intervalId, setIntervalId] = createSignal<NodeJS.Timeout>();

  createEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      if (currentStep() >= LOOP_STEPS_LENGTH) {
        setCurrentStep(0);
      }

      callback(currentStep());

      setCurrentStep((step) => step + 1);
    }, 60_000 / bpm / 16);
    // 1 minute is 60_000ms
    // `60_000 / bpm` gives us the interval between whole
    //                notes in a minute at the chosen tempo
    // `(60_000 / bpm) / 16` makes that the interval between
    //                16th notes

    setIntervalId(interval);

    onCleanup(() => {
      clearInterval(intervalId());
    });
  });
};
