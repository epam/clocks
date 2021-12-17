import { useContext, KeyboardEvent, useMemo } from 'react';
import clsx from 'clsx';

import { LocationsContext } from '../../context/locations';
import Location from '../../components/Location';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AddCity from '../../components/AddCity';
import DeleteModal from '../../components/DeleteModal';
import SettingsModal from '../../components/SettingsModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS, THEMES } from '../../lib/constants';
import Snackbar from '../../components/Snackbar';

import styles from './Dashboard.module.scss';
import { ThemeContext } from '../../context/theme';

const Dashboard = () => {
  const { getItem } = useLocalStorage();
  const {
    state: { hasCreateForm, locations },
    actions: { CreateFormHandler }
  } = useContext(LocationsContext);
  const {
    state: { type }
  } = useContext(ThemeContext);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '=' || event.key === '+') {
      if (CreateFormHandler) {
        CreateFormHandler();
      }
      event.preventDefault();
    }
  };

  const createFormHandler = (isVisible?: boolean) =>
    CreateFormHandler && CreateFormHandler(isVisible);

  const clocksFont = useMemo<string>(
    () => getItem(CLOCKS_FONT) || CLOCKS_FONTS.ROBOTO.value,
    [locations]
  );

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyPress={handleKeyDown}
      className={`${styles.body} ${clocksFont}`}
    >
      <Navbar />
      <DeleteModal />
      <SettingsModal />
      <div
        className={`${styles.container} ${clsx({
          [styles['container-light']]: type === THEMES.light,
          [styles['container-dark']]: type === THEMES.dark
        })}`}
      >
        {locations &&
          locations.map((props, index) => (
            <div key={index}>
              <Location {...props} />
            </div>
          ))}
        <AddCity
          visibility={hasCreateForm || false}
          setVisibility={createFormHandler}
        />
      </div>
      <Snackbar />
      <Footer />
    </div>
  );
};

export default Dashboard;
