import type { SerializedSong } from './songSerialization';

const STORAGE_KEY = 'taw_v0';

type TawStorage = { songs: SerializedSong[] };

export const getSavedSongs = () => {
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      const parsedStorage: TawStorage = JSON.parse(storage);
      return parsedStorage.songs;
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const saveSong = (name: string, serializedSong: Omit<SerializedSong, 'n'>) => {
  try {
    const savedSongs = getSavedSongs();
    const newSong = { n: name, ...serializedSong };

    if (!savedSongs) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ songs: [newSong] }));
      return true;
    }

    const newStorage = { songs: [...savedSongs, newSong] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newStorage));

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
