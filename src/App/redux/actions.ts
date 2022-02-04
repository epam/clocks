import { ACTION_TYPE } from './constants';
import { IActionSettingsPayload, ILocation, IActionSnackbarPayload } from './types';

export const setTheme = (payload: string) => ({ type: ACTION_TYPE.setTheme, payload });

export const setDeleteMode = (payload: boolean) => ({ type: ACTION_TYPE.setDeleteMode, payload });

export const setSettings = (payload: IActionSettingsPayload) => ({
  type: ACTION_TYPE.setSettings,
  payload
});

export const setDragDropMode = (payload: boolean) => ({
  type: ACTION_TYPE.setDragDropMode,
  payload
});

export const setSnackbar = (payload: IActionSnackbarPayload) => ({
  type: ACTION_TYPE.setSnackbar,
  payload
});

export const setUserLocation = (payload: ILocation) => ({
  type: ACTION_TYPE.setUserLocation,
  payload
});

export const setCounter = (payload: number) => ({ type: ACTION_TYPE.setCounter, payload });
