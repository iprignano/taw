import { createSignal } from 'solid-js';
import SaveSongModal from '../SaveSongModal/SaveSongModal';
import LoadSongModal from '../LoadSongModal/LoadSongModal';
import styles from './styles.module.css';

export default function Header() {
  const [isSavingSong, setIsSavingSong] = createSignal(false);
  const [isLoadingSong, setIsLoadingSong] = createSignal(false);

  const onSaveClick = () => {
    setIsSavingSong(true);
  };
  const onLoadClick = () => {
    setIsLoadingSong(true);
  };

  return (
    <header class={styles.header}>
      <button class={styles.button} type="button" onClick={onSaveClick}>
        Save
      </button>
      <button class={styles.button} type="button" onClick={onLoadClick}>
        Load
      </button>
      {isSavingSong() && <SaveSongModal onClose={() => setIsSavingSong(false)} />}
      {isLoadingSong() && <LoadSongModal onClose={() => setIsLoadingSong(false)} />}
    </header>
  );
}
