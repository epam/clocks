import { locationsDB } from './locationsDB';
import { timezonesDB } from './timezonesDB';
import { IInitialState, IActionPayload } from './types';
import { ACTION_TYPE, THEME, TIMEZONE, TIME_FORMAT } from './constants';

const initialState: IInitialState = {
  locations: {
    locationsDB: locationsDB,
    userLocation: undefined,
    timezonesDB: timezonesDB
  },
  deleteMode: {
    isOn: false
  },
  settings: {
    theme: THEME.light,
    autoTheme: undefined,
    showDate: true,
    showCountry: true,
    showFooter: true,
    timeFormat: TIME_FORMAT.H24,
    showTimezone: TIMEZONE.disabled
  },
  snackbar: {
    status: false,
    text: undefined,
    color: undefined
  },
  onboarding: undefined,
  planningMode: {
    isOn: false,
    additionalHours: 0
  },
  laneMode: {
    isOn: false,
    timeTable: []
  },
  counter: 0
};

const setTimeTable = (state = initialState, action: IActionPayload) => {
  const doesCityInclude = state.laneMode.timeTable.findIndex(i => i.city === action.payload.city);
  if (doesCityInclude === -1) {
    return {
      ...state,
      laneMode: {
        ...state.laneMode,
        timeTable: [...state.laneMode.timeTable, action.payload]
      }
    };
  }

  return state;
};

const reducer = (state = initialState, action: IActionPayload): IInitialState => {
  switch (action.type) {
    case ACTION_TYPE.setTheme:
      return {
        ...state,
        settings: {
          ...state.settings,
          theme: action.payload
        }
      };
    case ACTION_TYPE.setDeleteMode:
      return {
        ...state,
        deleteMode: {
          isOn: action.payload
        }
      };
    case ACTION_TYPE.setPlanningMode:
      return {
        ...state,
        planningMode: {
          ...action.payload
        }
      };
    case ACTION_TYPE.setLaneMode: {
      return {
        ...state,
        laneMode: {
          ...state.laneMode,
          ...action.payload
        }
      };
    }
    case ACTION_TYPE.setSettings:
      return {
        ...state,
        settings: {
          ...action.payload
        }
      };
    case ACTION_TYPE.setSnackbar:
      return {
        ...state,
        snackbar: {
          ...action.payload
        }
      };
    case ACTION_TYPE.setUserLocation:
      return {
        ...state,
        locations: {
          ...state.locations,
          userLocation: action.payload
        }
      };
    case ACTION_TYPE.setCounter:
      return {
        ...state,
        counter: action.payload
      };
    case ACTION_TYPE.setOnboarding:
      return {
        ...state,
        onboarding: action.payload
      };
    case ACTION_TYPE.setTimeTable:
      return setTimeTable(state, action);

    default:
      return state;
  }
};

export default reducer;
