import { Switch, Match, createSignal } from 'solid-js';

import Keyboard from '../Keyboard/Keyboard';
import SynthSequencer from '../SynthSequencer/SynthSequencer';

import styles from './styles.module.css';

export default function Synth(props: { isSequencing: boolean }) {
  return (
    <div class={styles.wrapper}>
      <Switch>
        <Match when={props.isSequencing}>
          <SynthSequencer />
        </Match>
        <Match when={!props.isSequencing}>
          <Keyboard />
        </Match>
      </Switch>
    </div>
  );
}
