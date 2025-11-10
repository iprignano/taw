import { random } from 'es-toolkit';
import { createSignal, useContext } from 'solid-js';
import { AppContext } from '../AppContext/AppContext';
import { serializeSong, type DeserializedSong } from '../../lib/songSerialization';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import styles from './styles.module.css';
import { saveSong } from '../../lib/storage';

export default function SaveSongModal(props: { onClose(): void }) {
  const context = useContext(AppContext);
  const [songName, setSongName] = createSignal('');
  const placeholderSongs = [
    'Holy, Holy',
    'Another brick in the wall',
    'Mesh cinereaL',
    'heavy focus',
    'IZ-US',
    'Se telefonando',
    'Immaterial',
    'Response to Subdivisions ☾',
    'Chase the Tear',
  ];

  const handleSubmit = (evt: SubmitEvent) => {
    evt.preventDefault();

    let song = {
      name: songName(),
      drums: context?.drums,
      keys: context?.keys,
    };
    // Spicy conversion to turn the Solid proxies
    // back into plain JavaScript objects
    song = JSON.parse(JSON.stringify(song));

    saveSong(song.name, serializeSong(song as DeserializedSong));
  };

  return (
    <Modal onClose={props.onClose}>
      <div class={styles.wrapper}>
        <h2>Save this song</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            id="songName"
            label="New song name"
            required
            onChange={(evt) => setSongName(evt.target.value)}
            placeholder={`e.g. ${placeholderSongs.at(random(placeholderSongs.length))}`}
          />

          <div class={styles.actions}>
            <Button variant="alternate" onClick={() => props.onClose()}>
              Cancel
            </Button>
            <Button type="submit" icon="pause">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
