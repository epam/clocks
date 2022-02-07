import { locationsDB } from './locationsDB';
import { IInitialState, IActionPayload } from './types';
import { ACTION_TYPE, THEME, TIME_FORMAT } from './constants';

const initialState: IInitialState = {
  deleteMode: false,
  dragDropMode: false,
  autoSorting: true,
  theme: THEME.light,
  autoTheme: undefined,
  showDate: true,
  showCountry: true,
  timeFormat: TIME_FORMAT.H24,
  locationsDB: locationsDB,
  userLocation: undefined,
  snackbarStatus: false,
  snackbarText: undefined,
  snackbarColor: undefined,
  counter: 0
};

const reducer = (state = initialState, action: IActionPayload): IInitialState => {
  switch (action.type) {
    case ACTION_TYPE.setTheme:
      return {
        ...state,
        theme: action.payload
      };
    case ACTION_TYPE.setDeleteMode:
      return {
        ...state,
        deleteMode: action.payload
      };
    case ACTION_TYPE.setDragDropMode:
      return {
        ...state,
        dragDropMode: action.payload
      };
    case ACTION_TYPE.setSettings:
      return {
        ...state,
        ...action.payload
      };
    case ACTION_TYPE.setSnackbar:
      return {
        ...state,
        snackbarStatus: action.payload.status,
        snackbarText: action.payload.text,
        snackbarColor: action.payload.color
      };
    case ACTION_TYPE.setUserLocation:
      return {
        ...state,
        userLocation: action.payload
      };
    case ACTION_TYPE.setCounter:
      return {
        ...state,
        counter: action.payload
      };
    case ACTION_TYPE.setTimeFormat:
      return {
        ...state,
        timeFormat: action.payload
      };

    default:
      return state;
  }
};

export default reducer;
