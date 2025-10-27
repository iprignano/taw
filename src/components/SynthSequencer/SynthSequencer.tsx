import { throttle } from 'es-toolkit/function';
import { createMemo, createSignal, Index, useContext } from 'solid-js';

import { AppContext } from '../AppContext/AppContext';

import styles from './styles.module.css';

// First octave, lower to higher notes
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
  // Build the notes register, starting from the base
  // first octave and doubling the frequency of the notes
  // for each octave loop
  let notes = [...baseNotes];
  let previousOctave = baseNotes;
  for (let oct = 1; oct < 5; oct++) {
    previousOctave = previousOctave.map(({ octave, note, freq }) => {
      return { octave: octave + 1, note, freq: freq * 2 };
    });
    notes.push(...previousOctave);
  }
  // Reverse them as we want to show the higher notes at the top
  return notes.reverse();
})();

const STEPS_LENGHT = 32;
const STEPS_ARRAY = Array.from({ length: STEPS_LENGHT }, (_, i) => i + 1);

export default function SynthSequencer() {
  const context = useContext(AppContext);
  const [draggedNote, setDraggedNote] = createSignal<{ step: number; freq: number } | null>(null);

  const toggleNote = ({ step, freq }: { step: number; freq: number }) => {
    if (context?.keys[step].find((n) => n.freq === freq)) {
      context?.setKeys(step, (n) => n.filter(({ freq: f }) => f !== freq));
    } else {
      context?.setKeys(step, context?.keys[step].length, { freq, length: 1 });
    }
  };

  const onNoteDragStart = (_: DragEvent, { step, freq }: { step: number; freq: number }) => {
    setDraggedNote({ step, freq });
  };
  const onNoteDragEnd = (_: DragEvent) => {
    setDraggedNote(null);
  };
  const onDragOver = throttle((evt: DragEvent, { step }: { step: number }) => {
    evt.preventDefault();

    if (step < (draggedNote()?.step ?? 0)) {
      // Do nothing
      return;
    }

    context?.setKeys(draggedNote()?.step as number, (note) => note?.freq === draggedNote()?.freq, {
      freq: draggedNote()?.freq,
      length: Math.max(1, step + 1 - (draggedNote()?.step ?? 0)),
    });
  }, 200);

  return (
    <div class={styles.wrapper}>
      <table class={styles.noteTable}>
        <tbody>
          <Index each={allNotes}>
            {(note) => (
              <tr>
                <td class={styles.noteName}>
                  {note().note}
                  {note().octave}
                </td>
                <Index each={STEPS_ARRAY}>
                  {(step) => {
                    const matchingNote = createMemo(() =>
                      context?.keys[step()].find((n) => n?.freq === note().freq),
                    );
                    return (
                      <td
                        onClick={() => toggleNote({ step: step(), freq: note().freq })}
                        onDragOver={(evt) => onDragOver(evt, { step: step() })}
                      >
                        {matchingNote() && (
                          <div
                            class={step() === context?.currentStep() ? `${styles.highlight}` : ''}
                            style={{ width: `calc(100% * ${matchingNote()?.length})` }}
                          >
                            {note().note}
                            {note().octave}
                            <span
                              class={styles.noteHandle}
                              draggable="true"
                              onDragStart={(evt) =>
                                onNoteDragStart(evt, { step: step(), freq: note().freq })
                              }
                              onDragEnd={(evt) => onNoteDragEnd(evt)}
                            />
                          </div>
                        )}
                      </td>
                    );
                  }}
                </Index>
              </tr>
            )}
          </Index>
        </tbody>
      </table>
    </div>
  );
}
