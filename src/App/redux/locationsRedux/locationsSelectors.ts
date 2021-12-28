import { RootState } from '../rootReducer';

const getLocations = (state: RootState) => state.locationsReducer.locations;

export { getLocations };
