import { Switch, Match, useContext } from 'solid-js';

import { AppContext } from '../AppContext/AppContext';
import Keyboard from '../Keyboard/Keyboard';
import SynthSequencer from '../SynthSequencer/SynthSequencer';

import styles from './styles.module.css';

export default function Synth() {
  const context = useContext(AppContext);

  return (
    <div class={styles.wrapper}>
      <Switch>
        <Match when={context?.isSequencingKeys()}>
          <SynthSequencer />
        </Match>
        <Match when={!context?.isSequencingKeys()}>
          <Keyboard />
        </Match>
      </Switch>
    </div>
  );
}
