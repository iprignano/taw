import { createContext, type Accessor, type Setter } from 'solid-js';
import type { Store } from 'solid-js/store';

export type AppContextValue = Store<{
  bpm: Accessor<number>;
  setBpm: Setter<number>;
  isPlaying: Accessor<boolean>;
  setIsPlaying: Setter<boolean>;
  isSequencingKeys: Accessor<boolean>;
  setIsSequencingKeys: Setter<boolean>;
}>;

export const AppContext = createContext<AppContextValue>();
