import { Switch, Match, createSignal } from 'solid-js';

import Keyboard from '../Keyboard/Keyboard';
import SynthSequencer from '../SynthSequencer/SynthSequencer';

import styles from './styles.module.css';

export default function Synth() {
  const [isSequencing, setIsSequencing] = createSignal(false);

  return (
    <div class={styles.wrapper}>
      <Switch>
        <Match when={isSequencing()}>
          <SynthSequencer />
        </Match>
        <Match when={!isSequencing()}>
          <Keyboard />
        </Match>
      </Switch>
    </div>
  );
}
