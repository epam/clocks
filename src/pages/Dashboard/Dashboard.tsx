import { useContext, KeyboardEvent, useMemo } from 'react';
import clsx from 'clsx';

import { LocationsContext } from '../../context/locations';
import Location from '../../containers/Location';
import Navbar from '../../containers/Navbar';
import Footer from '../../containers/Footer';
import InputDrawer from '../../containers/InputDrawer';
import DeleteModal from '../../containers/DeleteModal';
import SettingsModal from '../../containers/SettingsModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS, THEMES } from '../../constants';
import Snackbar from '../../containers/Snackbar';

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
        <InputDrawer
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
