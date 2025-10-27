import { fill } from 'es-toolkit/array';
import { createEffect, createSignal, onCleanup, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

import { AppContext } from '../AppContext/AppContext';
import { getAudioContext, playSnare, playKick, playHihats } from '../../lib/audio';
import styles from './styles.module.css';

const STEPS_LENGHT = 16;
const STEPS_ARRAY = Array.from({ length: STEPS_LENGHT }, (_, i) => i + 1);
const INSTRUMENTS = ['kick', 'snare', 'hihats'] as const;

type Instrument = (typeof INSTRUMENTS)[number];
type OnStepToggle = (instrument: Instrument, step: number, isChecked: boolean) => void;

export default function DrumsSequencer() {
  const context = useContext(AppContext);

  const onStepToggle: OnStepToggle = (instrument, step, isChecked) => {
    context?.setDrums(instrument, step - 1, isChecked);
  };

  const isHiglighted = (
    isPlaying: boolean | undefined,
    step: number,
    currentStep: number | undefined,
  ) => {
    if (!isPlaying || typeof currentStep === 'undefined') return false;
    const eigthStep = Math.floor(currentStep / 2);
    return isPlaying && eigthStep === step;
  };

  return (
    <div class={`${styles.wrapper} monospace`}>
      <div />
      {STEPS_ARRAY.map((step) => (
        <div
          classList={{
            [styles.step]: true,
            [styles.activeStep]: isHiglighted(context?.isPlaying(), step, context?.currentStep()),
          }}
        >
          {step}
        </div>
      ))}
      {INSTRUMENTS.map((instrument) => (
        <>
          <div class={styles.instrument}>{instrument}</div>
          {STEPS_ARRAY.map((step) => (
            <div
              classList={{
                [styles.activeStep]: isHiglighted(
                  context?.isPlaying(),
                  step,
                  context?.currentStep(),
                ),
              }}
            >
              <input
                type="checkbox"
                checked={context?.drums?.[instrument][step]}
                onChange={(evt) => {
                  evt.preventDefault();
                  onStepToggle(instrument, step + 1, evt.target.checked);
                }}
              />
            </div>
          ))}
        </>
      ))}
    </div>
  );
}
