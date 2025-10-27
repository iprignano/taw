import AppContextProvider from '../AppContext/AppContextProvider';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './styles.module.css';
import Instruments from '../Instruments/Instruments';

export default function App() {
  return (
    <AppContextProvider>
      <div class={styles.wrapper}>
        <Header />

        <div class={styles.body}>
          <Instruments />
        </div>

        <Footer />
      </div>
    </AppContextProvider>
  );
}
