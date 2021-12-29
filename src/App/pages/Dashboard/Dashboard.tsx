import { useContext, KeyboardEvent, useMemo, FC } from 'react';
import clsx from 'clsx';

import { LocationsContext } from '../../context/locations';
import Location from '../../components/Location';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AddCity from '../../components/Navbar/components/AddCity';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS, THEMES } from '../../lib/constants';
import Snackbar from '../../components/Snackbar';
import { ThemeContext } from '../../context/theme';

import styles from './Dashboard.module.scss';

const Dashboard: FC = () => {
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
