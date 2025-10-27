import { useAudioSequencing } from '../../lib/useAudioSequencing';
import DrumsSequencer from '../DrumsSequencer/DrumsSequencer';
import Synth from '../Synth/Synth';

import styles from './styles.module.css';

export default function Instruments() {
  // This is where all the
  // sound making happens:
  useAudioSequencing();

  return (
    <>
      <div class={`${styles.drums} ${styles.instrument}`}>
        <div class={styles.title}>
          <span class="monospace">drums</span>
        </div>
        <DrumsSequencer />
      </div>
      <div class={`${styles.keyboard} ${styles.instrument}`}>
        <div class={styles.title}>
          <span class="monospace">keyboard</span>
        </div>
        <Synth />
      </div>
    </>
  );
}
