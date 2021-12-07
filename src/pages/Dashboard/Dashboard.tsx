import { useContext, KeyboardEvent, useMemo } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';

import { LocationsContext } from '../../context/locations';
import { SnackbarContext } from '../../context/snackbar';
import { ScreenSizesContext } from '../../context/screenSizes';
import Location from '../../containers/Location';
import Navbar from '../../containers/Navbar';
import NavbarMobile from '../../containers/NavbarMobile';
import Footer from '../../containers/Footer';
import InputDrawer from '../../containers/InputDrawer';
import DeleteModal from '../../containers/DeleteModal';
import SettingsModal from '../../containers/SettingsModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS } from '../../constants';
import DrawerMobile from '../../containers/DrawerMobile';

const useStyles = makeStyles(theme => ({
  container: {
    maxWidth: '100%',
    margin: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    background: theme.palette.background.default,
    textAlign: 'center'
  }
}));

const Dashboard = () => {
  const css = useStyles();
  const { getItem } = useLocalStorage();
  const {
    state: { hasCreateForm, locations },
    actions: { CreateFormHandler }
  } = useContext(LocationsContext);
  const {
    state: { isSnackbarOpen, message },
    actions: { SnackbarHandler }
  } = useContext(SnackbarContext);
  const {
    state: { width, showDrawerMobile },
    actions: { HandleDrawerMobile }
  } = useContext(ScreenSizesContext);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '=' || event.key === '+') {
      if (CreateFormHandler) {
        CreateFormHandler();
      }
      event.preventDefault();
    }
  };

  const snackbarHandler = () => SnackbarHandler && SnackbarHandler(false);
  const createFormHandler = (isVisible?: boolean) =>
    CreateFormHandler && CreateFormHandler(isVisible);
  const handleDrawerMobile = (isVisible: boolean) =>
    HandleDrawerMobile && HandleDrawerMobile(isVisible);

  const clocksFont = useMemo<string>(
    () => getItem(CLOCKS_FONT) || CLOCKS_FONTS.ROBOTO.value,
    [locations]
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/no-static-element-interactions
    <div
      tabIndex={0}
      role="button"
      onKeyPress={handleKeyDown}
      className={`wrapper ${clocksFont}`}
    >
      {width && width <= 600 ? <NavbarMobile /> : <Navbar />}
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
        <DrawerMobile
          visibility={showDrawerMobile || false}
          setVisibility={handleDrawerMobile}
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={isSnackbarOpen}
        autoHideDuration={3}
        message={message || ''}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={snackbarHandler}
          >
            x
          </IconButton>
        }
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
