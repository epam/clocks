import { useContext, KeyboardEvent, useMemo, FC, useState } from 'react';
import clsx from 'clsx';

import { LocationsContext } from '../../context/locations';
import Location from '../../components/Location';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AddCity from '../../components/Navbar/components/AddCity';
import SettingsModal from '../../components/SettingsModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS, THEMES } from '../../lib/constants';
import Snackbar from '../../components/Snackbar';
import { ThemeContext } from '../../context/theme';

import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
  const [isAddCitySidebarOpen, setIsAddCitySidebarOpen] =
    useState<boolean>(false);
  const { getItem } = useLocalStorage();
  const {
    state: { locations }
  } = useContext(LocationsContext);
  const {
    state: { type }
  } = useContext(ThemeContext);

  const addCitySidebarHandler = () => {
    setIsAddCitySidebarOpen(prev => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '=' || event.key === '+') {
      addCitySidebarHandler();
      event.preventDefault();
    }
  };

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
      <Navbar addCitySidebarHandler={addCitySidebarHandler} />
      <SettingsModal />
      <div
        className={`${styles.container} ${clsx({
          [styles['container-light']]: type === THEMES.light,
          [styles['container-dark']]: type === THEMES.dark
        })}`}
      >
        {locations && locations?.length > 0 ? (
          locations.map((props, index) => (
            <div key={index}>
              <Location {...props} />
            </div>
          ))
        ) : (
          <div
            className={clsx(styles.noCities, {
              [styles.noCitiesLight]: type === THEMES.light,
              [styles.noCitiesDark]: type === THEMES.dark
            })}
          >
            No active cities
          </div>
        )}
      </div>
      <AddCity
        visibility={isAddCitySidebarOpen}
        visibilityHandler={addCitySidebarHandler}
      />
      <Snackbar />
      <Footer />
    </div>
  );
};

export default Dashboard;
