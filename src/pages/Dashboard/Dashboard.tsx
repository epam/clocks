import { useContext, KeyboardEvent, useMemo } from 'react';
import { makeStyles } from '@material-ui/core';

import { LocationsContext } from '../../context/locations';
import Location from '../../containers/Location';
import Navbar from '../../containers/Navbar';
import Footer from '../../containers/Footer';
import InputDrawer from '../../containers/InputDrawer';
import DeleteModal from '../../containers/DeleteModal';
import SettingsModal from '../../containers/SettingsModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS } from '../../constants';
import Snackbar from '../../containers/Snackbar';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '100%',
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    background: theme.palette.background.default
  }
}));

const Dashboard = () => {
  const css = useStyles();
  const { getItem } = useLocalStorage();
  const {
    state: { hasCreateForm, locations },
    actions: { CreateFormHandler }
  } = useContext(LocationsContext);

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
      className={`wrapper ${clocksFont}`}
    >
      <Navbar />
      <DeleteModal />
      <SettingsModal />
      <div className={css.container}>
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
