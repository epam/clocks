import { locationsDB } from './locationsDB';
import { timezonesDB } from './timezonesDB';
import { IInitialState, IActionPayload } from './types';
import { ITimeState } from '../components/Section/components/LocationBlock/LocationBlock.types';
import { ACTION_TYPE, THEME, TIME_FORMAT } from './constants';

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
    showFooter: true,
    showTimezone: true,
    showFlag: true,
    showCountry: true,
    timeFormat: TIME_FORMAT.H24
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
    isOn: false
  },
  timeTable: [],
  counter: 0
};

const setTimeTable = (state = initialState, action: IActionPayload) => {
  let timeTable: ITimeState[] = JSON.parse(JSON.stringify(state.timeTable));
  const doesCityInclude = state.timeTable.findIndex(i => i.city === action.payload.city);

  if (doesCityInclude === -1 && action.payload.userLocation) {
    timeTable.unshift(action.payload);
  }

  if (doesCityInclude === -1 && !action.payload.userLocation) {
    timeTable.push(action.payload);
  }

  if (
    doesCityInclude !== -1 &&
    state.timeTable[doesCityInclude].userLocation !== action.payload.userLocation
  ) {
    if (action.payload.userLocation) {
      const idx = timeTable.findIndex(i => i.city === action.payload.city);
      timeTable.splice(idx, 1);
      timeTable = timeTable.sort((a, b) => a.hours.localeCompare(b.hours));
      timeTable.unshift(action.payload);
    }
  }

  return {
    ...state,
    timeTable
  };
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
