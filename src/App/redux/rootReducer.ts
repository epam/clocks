import { combineReducers } from 'redux';

import { locationsReducer } from './locationsRedux/locationsSlice';
import { snackbarReducer } from './snackbarRedux/snackbarSlice';
import { navbarReducer } from './navbarRedux/navbarSlice';

const rootReducer = combineReducers({
  locationsReducer,
  snackbarReducer,
  navbarReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
