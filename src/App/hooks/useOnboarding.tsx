import React from 'react';
import { useDispatch } from 'react-redux';
import { setOnboarding, setSettings } from '../redux/actions';
import { IOnboarding } from '../redux/types';

import { THEME, TIME_FORMAT } from '../redux/constants';

const onboardingInitialState: IOnboarding = {
  addCity: false,
  myLocation: false,
  comment: false,
  shareButton: false,
  deleteButton: false,
  settingsModal: false,
  planningMode: false,
  dragDropMode: false,
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
  let parsedSettings: any, isAutoSortingOn: boolean;

  if (localSettings) {
    parsedSettings = JSON.parse(localSettings);
    isAutoSortingOn = parsedSettings['autoSorting'];
  }

  const initialize = () => {
    if (localStorage.getItem('onboarding') === null) {
      if (localSettings) {
        dispatch(setSettings({ ...parsedSettings, autoSorting: false }));
      }

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

    if (localSettings) {
      if (isAutoSortingOn) {
        dispatch(setSettings({ ...parsedSettings, autoSorting: true }));
        localStorage.setItem('settings', JSON.stringify({ ...parsedSettings, autoSorting: true }));
      } else {
        dispatch(setSettings({ ...parsedSettings, autoSorting: false }));
        localStorage.setItem('settings', JSON.stringify({ ...parsedSettings, autoSorting: false }));
      }
    } else {
      dispatch(
        setSettings({
          autoTheme: undefined,
          theme: THEME.light,
          showDate: true,
          showCountry: true,
          showTimezone: false,
          timeFormat: TIME_FORMAT.H24,
          autoSorting: true
        })
      );
      localStorage.setItem(
        'settings',
        JSON.stringify({
          autoTheme: undefined,
          theme: THEME.light,
          showDate: true,
          showCountry: true,
          showTimezone: false,
          timeFormat: TIME_FORMAT.H24,
          autoSorting: true
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
