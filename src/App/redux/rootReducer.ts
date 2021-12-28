import { combineReducers } from 'redux';

import { locationsReducer } from './locationsRedux/locationsSlice';
import { snackbarReducer } from './snackbarRedux/snackbarSlice';
import { themeReducer } from './themeRedux/themeSlice';

const rootReducer = combineReducers({
  locationsReducer,
  snackbarReducer,
  themeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
