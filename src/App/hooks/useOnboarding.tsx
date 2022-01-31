import React from 'react';
import { useDispatch } from 'react-redux';
import { setOnboarding } from '../redux/actions';
import { IOnboarding } from '../redux/types';

const onboardingInitialState: IOnboarding = {
  deleteButton: false,
  settingsModal: false,
  shareButton: false,
  addCity: false,
  comment: false,
  myLocation: false
};
const onboardingSequence = Object.keys(onboardingInitialState) as unknown as keyof IOnboarding;

const useOnboarding = () => {
  const dispatch = useDispatch();

  const next = (next: keyof IOnboarding | undefined) => {
    if (next) {
      dispatch(
        setOnboarding({
          ...onboardingInitialState,
          [next]: true
        })
      );
    } else {
      dispatch(setOnboarding(onboardingInitialState));
    }
  };

  const initialize = () => {
    if (localStorage.getItem('onboarding') === null) {
      localStorage.setItem('onboarding', 'false');
      dispatch(
        setOnboarding({
          ...onboardingInitialState,
          deleteButton: true
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
