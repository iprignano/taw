import { useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { AppContext } from '../AppContext/AppContext';
import { Play } from '../Icon/Play';
import { Pause } from '../Icon/Pause';
import BpmInput from './BpmInput';

import styles from './styles.module.css';

const options = {
  play: Play,
  pause: Pause,
};

export default function Footer() {
  const context = useContext(AppContext);

  return (
    <footer class={`${styles.footer} monospace`}>
      <div class={styles.tempo}>
        <BpmInput />
      </div>
      <div class={styles.synthSwitch}>
        <input
          type="checkbox"
          onChange={(evt) => context?.setIsSequencingKeys(evt.target.checked)}
        />
      </div>
      <button
        class={`${styles.playToggle} monospace`}
        onClick={() => context?.setIsPlaying((isPlaying) => !isPlaying)}
      >
        {context?.isPlaying() ? 'Pause' : 'Play'}
        <Dynamic component={options[context?.isPlaying() ? 'pause' : 'play']} fill="white" />
      </button>
    </footer>
  );
}
