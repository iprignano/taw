import {
  deserializeSong,
  serializeSong,
  type DeserializedSong,
  type SerializedSong,
} from './songSerialization';

const STORAGE_KEY = 'taw_v0';

type TawStorage = { songs: SerializedSong[] };

export const getSavedSongs = () => {
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      const parsedStorage: TawStorage = JSON.parse(storage);
      return parsedStorage.songs.map(deserializeSong);
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const saveSong = (song: DeserializedSong) => {
  try {
    const savedSongs = getSavedSongs();

    // Spicy conversion to turn the Solid proxies
    // back into plain JavaScript objects
    const plainSong: DeserializedSong = JSON.parse(JSON.stringify(song));
    const newSong = serializeSong(plainSong);

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
