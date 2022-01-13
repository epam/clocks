import { combineReducers } from 'redux';

import { locationsReducer } from './locationsRedux/locationsSlice';
import { snackbarReducer } from './snackbarRedux/snackbarSlice';
import { themeReducer } from './themeRedux/themeSlice';
import { navbarReducer } from './navbarRedux/navbarSlice';

const rootReducer = combineReducers({
  locationsReducer,
  snackbarReducer,
  themeReducer,
  navbarReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
