import { AppContext, type AppContextValue } from './AppContext';
import { createSignal, type JSXElement } from 'solid-js';
import { createStore } from 'solid-js/store';

export default function AppContextProvider(props: {
  value?: AppContextValue;
  children: JSXElement;
}) {
  const [bpm, setBpm] = createSignal(120);
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [isSequencingKeys, setIsSequencingKeys] = createSignal(true);

  const [appStore, _] = createStore({
    bpm,
    setBpm,
    isPlaying,
    setIsPlaying,
    isSequencingKeys,
    setIsSequencingKeys,
  });

  return (
    <AppContext.Provider value={props.value ?? appStore}>{props.children}</AppContext.Provider>
  );
}
