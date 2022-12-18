import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Snackbar, Alert, Slide } from '@mui/material';

import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Footer from './components/Footer/Footer';
import useTheme from './hooks/useTheme';
import useSnackbar from './hooks/useSnackbar';
import useAutoTheme from './hooks/useAutoTheme';
import { IInitialState } from './redux/types';
import pckg from '../../package.json';
import style from './App.module.scss';
import useOnboarding from './hooks/useOnboarding';
import { useSearchParams } from 'react-router-dom';

const App: React.FC = () => {
  const theme = useTheme(style.lightBody, style.darkBody);
  const screenRef = useRef<HTMLDivElement>(null);

  const { closeSnackbar } = useSnackbar();

  const { setAutoTheme } = useAutoTheme();

  const { initialize } = useOnboarding();

  const [searchParams, setSearchParams] = useSearchParams();

  const { autoTheme } = useSelector((state: IInitialState) => state.settings);
  const { counter, snackbar } = useSelector((state: IInitialState) => state);

  useEffect(() => {
    if (autoTheme && counter % 60 === 0) {
      setAutoTheme();
    }
    // don't need as a dependency autoTheme and setAutoTheme
    // eslint-disable-next-line
  }, [counter]);

  useEffect(() => {
    localStorage.setItem('version', pckg.version);

    initialize();
    // don't need initialize function as a dependency
    // eslint-disable-next-line
  }, []);

  const listener = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      screenRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', listener);

    return () => window.removeEventListener('keydown', listener);
  }, []);

  useEffect(() => {
    const urlLocations = searchParams.get('locations');
    const savedLocations = localStorage.getItem('locations');

    !urlLocations &&
      savedLocations &&
      setSearchParams({
        locations: savedLocations
      });
    // don't need as a dependency setSearchParams
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={screenRef} tabIndex={0}>
      <div className={theme}>
        <div>
          <Header />
          <Section />
        </div>
        {<Footer />}
      </div>
      {snackbar.status && (
        <Snackbar
          open={snackbar.status}
          onClose={closeSnackbar}
          autoHideDuration={3000}
          TransitionComponent={props => <Slide {...props} direction="up" />}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbar} severity={snackbar.color || 'info'}>
            {snackbar.text}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default App;
