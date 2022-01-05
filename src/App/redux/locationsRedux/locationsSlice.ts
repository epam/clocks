import { createSlice } from '@reduxjs/toolkit';
import { convertData } from '../../handlers';
import { CURRENT_USER_LOCATION_ID } from '../../lib/constants';

import { INITIAL_STATE } from './locations.constants';

const createLocationsSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {
      ChangeUserCurrentLocation(state, action) {
        const locationId = action.payload;
        if (!locationId) {
          console.error(
            'Location id for setting user current location is not valid'
          );
        }
        localStorage.setItem(CURRENT_USER_LOCATION_ID, locationId);
        const convertedLocations = convertData(state.locations, locationId);
        return {
          ...state,
          locations: convertedLocations
        };
      },
      SetLocations(state, action) {
        const newLocations = action.payload;
        return {
          ...state,
          locations: newLocations
        };
      }
    }
  });

export const { actions: locationsActions, reducer: locationsReducer } =
  createLocationsSlice('locations');
