import { useDispatch } from 'react-redux';
import { setOnboarding, setSettings } from '../redux/actions';
import { IOnboarding } from '../redux/types';
import { THEME, TIMEZONE, TIME_FORMAT } from '../redux/constants';

const onboardingInitialState: IOnboarding = {
  addCity: false,
  myLocation: false,
  comment: false,
  shareButton: false,
  deleteButton: false,
  settingsModal: false,
  helpModule: false,
  reloadOnboarding: false
};

const useOnboarding = () => {
  const dispatch = useDispatch();

  const next = (next: keyof IOnboarding) => {
    dispatch(
      setOnboarding({
        ...onboardingInitialState,
        [next]: true
      })
    );
  };

  let localSettings = localStorage.getItem('settings');
  let parsedSettings: any;

  if (localSettings) {
    parsedSettings = JSON.parse(localSettings);
  }

  const initialize = () => {
    if (localStorage.getItem('onboarding') === null) {
      localStorage.setItem('onboarding', 'false');
      dispatch(
        setOnboarding({
          ...onboardingInitialState,
          addCity: true
        })
      );
    }
  };

  const finish = () => {
    dispatch(setOnboarding(onboardingInitialState));
    if (parsedSettings) {
      dispatch(setSettings(parsedSettings));
      localStorage.setItem('settings', JSON.stringify(parsedSettings));
    } else {
      dispatch(
        setSettings({
          autoTheme: undefined,
          theme: THEME.light,
          showDate: true,
          showCountry: true,
          showTimezone: TIMEZONE.disabled,
          timeFormat: TIME_FORMAT.H24
        })
      );
      localStorage.setItem(
        'settings',
        JSON.stringify({
          autoTheme: undefined,
          theme: THEME.light,
          showDate: true,
          showCountry: true,
          showTimezone: TIMEZONE.disabled,
          timeFormat: TIME_FORMAT.H24
        })
      );
    }
  };

  return {
    initialize,
    next,
    finish
  };
};

export default useOnboarding;
