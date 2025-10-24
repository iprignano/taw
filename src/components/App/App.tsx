import AppContextProvider from '../AppContext/AppContextProvider';
import Header from '../Header/Header';
import DrumsSequencer from '../DrumsSequencer/DrumsSequencer';
import Synth from '../Synth/Synth';
import Footer from '../Footer/Footer';

import styles from './styles.module.css';

export default function App() {
  return (
    <AppContextProvider>
      <div class={styles.wrapper}>
        <Header />

        <div class={styles.body}>
          <div class={`${styles.drums} ${styles.instrument}`}>
            <div class={styles.title}>
              <span class="monospace">drums</span>
            </div>
            <DrumsSequencer />
          </div>
          <div class={`${styles.keyboard} ${styles.instrument}`}>
            <div class={styles.title}>
              <span class="monospace">keyboard</span>
            </div>
            <Synth />
          </div>
        </div>

        <Footer />
      </div>
    </AppContextProvider>
  );
}
