import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useSnackbar from './useSnackbar';
import { setTheme, setSettings } from '../redux/actions';
import { THEME } from '../redux/constants';
import { IInitialState } from '../redux/types';

const useAutoTheme = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { showDate, showCountry, theme, autoTheme, timeFormat } = useSelector(
    (state: IInitialState) => state
  );

  const { snackbarError } = useSnackbar();

  const setAutoTheme = () => {
    const checkAutoThemeSupport = window.matchMedia('(prefers-color-scheme)').media;

    if (checkAutoThemeSupport !== 'not all') {
      const darkModeMediaQuery = window.matchMedia(`(prefers-color-scheme: ${THEME.dark})`);

      if (darkModeMediaQuery.matches) {
        dispatch(setTheme(THEME.dark));
        localStorage.setItem(
          'settings',
          JSON.stringify({ showDate, showCountry, autoTheme, theme: THEME.dark, timeFormat })
        );
      } else {
        dispatch(setTheme(THEME.light));
        localStorage.setItem(
          'settings',
          JSON.stringify({ showDate, showCountry, autoTheme, theme: THEME.light, timeFormat })
        );
      }
    } else {
      dispatch(setSettings({ showDate, showCountry, theme, timeFormat, autoTheme: false }));
      snackbarError(t('UseAutoTheme.SnackbarMessage'));
    }
  };

  return { setAutoTheme };
};

export default useAutoTheme;
