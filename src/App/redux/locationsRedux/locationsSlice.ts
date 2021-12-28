import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATE } from './locations.constants';

const createLocationsSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {}
  });

export const { actions: locationsActions, reducer: locationsReducer } =
  createLocationsSlice('locations');
