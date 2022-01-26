import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Snackbar, Alert, Slide } from '@mui/material';

import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Footer from './components/Footer/Footer';
import useTheme from './hooks/useTheme';
import useSnackbar from './hooks/useSnackbar';
import useAutoTheme from './hooks/useAutoTheme';
import { IInitialState } from './redux/types';

import style from './App.module.scss';

const App: React.FC = () => {
  const theme = useTheme(style.lightBody, style.darkBody);

  const { closeSnackbar } = useSnackbar();

  const { setAutoTheme } = useAutoTheme();

  const { autoTheme, counter, snackbarStatus, snackbarText, snackbarColor } = useSelector(
    (state: IInitialState) => state
  );

  useEffect(() => {
    if (autoTheme && counter % 60 === 0) {
      setAutoTheme();
    }
    // don't need as a dependancy autoTheme and setAutoTheme
    // eslint-disable-next-line
  }, [counter]);

  return (
    <>
      <div className={theme}>
        <div>
          <Header />
          <Section />
        </div>
        <Footer />
      </div>
      {snackbarStatus && (
        <Snackbar
          open={snackbarStatus}
          onClose={closeSnackbar}
          autoHideDuration={3000}
          TransitionComponent={props => <Slide {...props} direction="up" />}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbar} severity={snackbarColor || 'info'}>
            {snackbarText}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default App;