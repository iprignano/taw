import { createSignal } from 'solid-js';

import styles from './styles.module.css';

const octaves = 4;
const baseNotes = [
  { note: 'B', freq: 246.92 },
  { note: 'A#', freq: 233.08 },
  { note: 'A', freq: 220 },
  { note: 'G#', freq: 207.64 },
  { note: 'G', freq: 195.96 },
  { note: 'F#', freq: 184.96 },
  { note: 'F', freq: 174.6 },
  { note: 'E', freq: 164.8 },
  { note: 'D#', freq: 155.56 },
  { note: 'D', freq: 146.8 },
  { note: 'C#', freq: 138.56 },
  { note: 'C', freq: 130.8 },
];

export default function SynthSequencer() {
  console.log(baseNotes.reverse());
  return (
    <div>
      <table>
        <tbody>
          {[1, 2].map(() => {
            return 'lol';
          })}
        </tbody>
      </table>
    </div>
  );
}
