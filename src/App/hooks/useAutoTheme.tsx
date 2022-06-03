import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import useSnackbar from './useSnackbar/useSnackbar';
import { setTheme, setSettings } from '../redux/actions';
import { THEME } from '../redux/constants';
import { IInitialState } from '../redux/types';

const useAutoTheme = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { showDate, showCountry, showTimezone, theme, autoTheme, timeFormat, autoSorting } =
    useSelector((state: IInitialState) => state.settings);

  const { snackbarError } = useSnackbar();

  const setAutoTheme = () => {
    const checkAutoThemeSupport = window.matchMedia('(prefers-color-scheme)').media;

    if (checkAutoThemeSupport !== 'not all') {
      const darkModeMediaQuery = window.matchMedia(`(prefers-color-scheme: ${THEME.dark})`);

      if (darkModeMediaQuery.matches) {
        dispatch(setTheme(THEME.dark));
        localStorage.setItem(
          'settings',
          JSON.stringify({
            showDate,
            showCountry,
            autoTheme,
            theme: THEME.dark,
            timeFormat,
            autoSorting,
            showTimezone
          })
        );
      } else {
        dispatch(setTheme(THEME.light));
        localStorage.setItem(
          'settings',
          JSON.stringify({
            showDate,
            showCountry,
            showTimezone,
            autoTheme,
            theme: THEME.light,
            timeFormat,
            autoSorting
          })
        );
      }
    } else {
      dispatch(
        setSettings({
          showDate,
          showCountry,
          showTimezone,
          theme,
          timeFormat,
          autoTheme: false,
          autoSorting
        })
      );
      snackbarError(t('UseAutoTheme.SnackbarMessage'));
    }
  };

  return { setAutoTheme };
};

export default useAutoTheme;
