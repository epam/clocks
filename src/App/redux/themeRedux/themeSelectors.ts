import { RootState } from '../rootReducer';

export const getAutoStatus = (state: RootState) => state.themeReducer.auto;

export const getCurrentTheme = (state: RootState) => state.themeReducer.theme;
