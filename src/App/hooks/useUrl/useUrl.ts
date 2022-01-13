import { useDispatch } from 'react-redux';
import { getCurrentUserLocation, CheckForCityExistence } from '../../handlers';
import { useQueryParams } from '../useQueryParams';
import { snackbarActions } from '../../redux/snackbarRedux/snackbarSlice';
import { TLocationId } from '../../redux/locationsRedux/locations.interface';
import { PARAM_KEYWORD } from '../../redux/locationsRedux/locations.constants';

export const useUrl = () => {
  const { SetParam, GetParam } = useQueryParams();
  const dispatch = useDispatch();
  const { snackbarHandler } = snackbarActions;

  const AddLocation = (locationId: TLocationId, message: string = '') => {
    const locationsFromUrl = GetParam(PARAM_KEYWORD) || [];
    if (!Array.isArray(locationsFromUrl)) {
      return console.error('Unexpected type!');
    }
    const isCityAlreadyAdded = CheckForCityExistence(
      locationsFromUrl,
      locationId
    );
    if (isCityAlreadyAdded) {
      dispatch(
        snackbarHandler({
          visibility: true,
          message: 'This city has already been added!'
        })
      );
      return;
    }
    locationsFromUrl.push(`${locationId}${message && `__${message}`}`);
    SetParam(PARAM_KEYWORD, locationsFromUrl);
  };

  const DeleteLocation = (locationId: string) => {
    if (!locationId) {
      return console.error('Id for deleting Location is not valid!');
    }
    const locationsFromUrl = GetParam(PARAM_KEYWORD) || [];
    if (!Array.isArray(locationsFromUrl)) {
      return console.error('Unexpected type!');
    }
    const filteredLocations = locationsFromUrl.filter(
      location => !location.startsWith(locationId)
    );
    SetParam(PARAM_KEYWORD, filteredLocations);
  };

  const ResetUrl = async () => {
    const locationId = await getCurrentUserLocation();
    const locations = [locationId];
    SetParam(PARAM_KEYWORD, locations);
  };

  const GetLocationsFromUrl = () => {
    const locationsFromUrl = GetParam<TLocationId[]>(PARAM_KEYWORD) || [];
    const locationIdsFromUrl = locationsFromUrl.map(location => {
      const id = location.split('__')[0];
      return id;
    });
    return locationIdsFromUrl;
  };

  const AddComment = (locationId: TLocationId, comment: string) => {
    const locationsFromUrl = GetParam<TLocationId[]>(PARAM_KEYWORD) || [];
    const newLocations = locationsFromUrl.map(location => {
      if (location.startsWith(locationId)) {
        return `${locationId}__${comment}`;
      }
      return location;
    }, []);
    SetParam(PARAM_KEYWORD, newLocations);
  };

  return {
    AddLocation,
    ResetUrl,
    DeleteLocation,
    GetLocationsFromUrl,
    AddComment
  };
};
