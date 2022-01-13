import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './navbar.constants';

const createNavbarSlice = (name: string) =>
  createSlice({
    name,
    initialState: INITIAL_STATE,
    reducers: {}
  });

export const { actions: navbarActions, reducer: navbarReducer } =
  createNavbarSlice('navbar');
