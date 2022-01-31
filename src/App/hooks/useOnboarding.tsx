import React from 'react';
import { useDispatch } from 'react-redux';
import { setOnboarding } from '../redux/actions';
import { IOnboarding } from '../redux/types';

const onboardingInitialState: IOnboarding = {
  addCity: false,
  myLocation: false,
  comment: false,
  shareButton: false,
  deleteButton: false,
  settingsModal: false
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

  const finish = () => dispatch(setOnboarding(onboardingInitialState));

  return {
    initialize,
    next,
    finish
  };
};

export default useOnboarding;
