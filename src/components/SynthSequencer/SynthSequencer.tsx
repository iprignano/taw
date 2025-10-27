import { useContext } from 'solid-js';

import { AppContext } from '../AppContext/AppContext';

import styles from './styles.module.css';

// First Octave, bottom to top
const baseNotes = [
  { octave: 1, note: 'C', freq: 32.7 },
  { octave: 1, note: 'C#', freq: 34.64 },
  { octave: 1, note: 'D', freq: 36.7 },
  { octave: 1, note: 'D#', freq: 38.89 },
  { octave: 1, note: 'E', freq: 41.2 },
  { octave: 1, note: 'F', freq: 43.65 },
  { octave: 1, note: 'F#', freq: 46.24 },
  { octave: 1, note: 'G', freq: 48.99 },
  { octave: 1, note: 'G#', freq: 51.91 },
  { octave: 1, note: 'A', freq: 55 },
  { octave: 1, note: 'A#', freq: 58.27 },
  { octave: 1, note: 'B', freq: 61.73 },
];

const allNotes = (() => {
  let notes = [...baseNotes];
  let previousOctave = baseNotes;
  for (let round = 1; round < 5; round++) {
    previousOctave = previousOctave.map(({ octave, note, freq }) => {
      return { octave: octave + 1, note, freq: freq * 2 };
    });
    notes.push(...previousOctave);
  }
  return notes.reverse();
})();

const STEPS_LENGHT = 32;
const STEPS_ARRAY = Array.from({ length: STEPS_LENGHT }, (_, i) => i + 1);

export default function SynthSequencer() {
  const context = useContext(AppContext);

  const toggleNote = ({ step, freq }: { step: number; freq: number }) => {
    if (context?.keys[step].find((n) => n.freq === freq)) {
      context?.setKeys(step, (n) => n.filter(({ freq: f }) => f !== freq));
    } else {
      context?.setKeys(step, context?.keys[step].length, { freq, length: 1 });
    }
  };

  return (
    <div class={styles.wrapper}>
      <table class={styles.noteTable}>
        <tbody>
          {allNotes.map(({ note, octave, freq }) => (
            <tr>
              <td class={styles.noteName}>
                {note}
                {octave}
              </td>
              {STEPS_ARRAY.map((step) => (
                <td onClick={() => toggleNote({ step, freq })}>
                  {context?.keys[step].find((n) => n?.freq === freq) && (
                    <span class={step === context?.currentStep() ? `${styles.highlight}` : ''}>
                      {note}
                      {octave}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
