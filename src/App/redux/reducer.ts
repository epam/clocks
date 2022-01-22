import { IInitialState, IActionPayload } from './types';
import { ACTION_TYPE, THEME } from './constants';

const initialState: IInitialState = {
  deleteMode: false,
  theme: THEME.light,
  autoTheme: undefined,
  showDate: true,
  showCountry: true,
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

    default:
      return state;
  }
};

export default reducer;
