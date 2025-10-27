import { createSignal, type JSXElement } from 'solid-js';
import { createStore } from 'solid-js/store';
import { fill } from 'es-toolkit';

import { AppContext, type AppContextValue } from './AppContext';

export default function AppContextProvider(props: {
  value?: AppContextValue;
  children: JSXElement;
}) {
  const [bpm, setBpm] = createSignal(120);
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [currentStep, setCurrentStep] = createSignal(0);
  const [isSequencingKeys, setIsSequencingKeys] = createSignal(true);

  const initialDrumsStore = {
    kick: fill(Array(16), false),
    snare: fill(Array(16), false),
    hihats: fill(Array(16), false),
  };

  const [drums, setDrums] = createStore(initialDrumsStore);
  const [keys, setKeys] = createStore();

  const [appStore, _] = createStore({
    bpm,
    setBpm,
    isPlaying,
    setIsPlaying,
    isSequencingKeys,
    setIsSequencingKeys,
    drums,
    setDrums,
    keys,
    setKeys,
    currentStep,
    setCurrentStep,
  });

  return (
    <AppContext.Provider value={props.value ?? appStore}>{props.children}</AppContext.Provider>
  );
}
