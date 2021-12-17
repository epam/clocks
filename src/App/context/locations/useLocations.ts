import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  getCurrentUserLocation,
  convertData,
  CheckForCityExistence
} from '../../handlers';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations/convertFromUrlLocations';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useUrl } from '../../hooks/useUrl/useUrl';
import { CURRENT_USER_LOCATION_ID, PARAM_KEYWORD } from '../../lib/constants';
import { IAppLocation } from '../../lib/interfaces';
import { TLocationId } from '../../lib/types';
import { ILocationContext } from './LocationsContext.interface';

export const useLocations = (): ILocationContext => {
  const [locations, setLocations] = useState<IAppLocation[]>([]);
  const [hasCreateForm, setHasCreateForm] = useState(false);
  const { setItem } = useLocalStorage();

  const location = useLocation();

  const { SetParam, GetParam } = useQueryParams();
  const {
    AddComment,
    AddLocation,
    DeleteLocation,
    ResetUrl,
    GetLocationsFromUrl
  } = useUrl();

  const CreateFormHandler = (hasForm?: boolean) => {
    if (hasForm && typeof hasForm === 'boolean') {
      setHasCreateForm(hasForm);
    } else {
      setHasCreateForm(prevState => !prevState);
    }
  };

  const ChangeUserCurrentLocation = (locationId: TLocationId) => {
    if (!locationId) {
      console.error(
        'Location id for setting user current location is not valid'
      );
    }
    setItem(CURRENT_USER_LOCATION_ID, locationId);
    const convertedLocations = convertData(locations, locationId);
    setLocations(convertedLocations);
  };

  const SetCurrentUserLocation = async () => {
    let locations: string[] = GetParam<string[]>(PARAM_KEYWORD) || [];
    const locationId = await getCurrentUserLocation();
    if (!locations || !locations.length) {
      locations = [locationId];
      return SetParam(PARAM_KEYWORD, locations);
    }
    if (!Array.isArray(locations)) {
      return console.error('Locations are not valid');
    }
    const currentUserExists = CheckForCityExistence(locations, locationId);
    if (!currentUserExists) {
      AddLocation(locationId);
    }
  };

  const SetLocationsFromUrl = async () => {
    const locationsFromUlrParams: string[] =
      GetParam<string[]>(PARAM_KEYWORD) || [];
    if (!Array.isArray(locationsFromUlrParams)) {
      return console.error('Locations from url must be array');
    }
    const currentUserLocationId: string = await getCurrentUserLocation();
    const locationObjects = convertFromUrlLocations(locationsFromUlrParams);
    const convertedLocations = convertData(
      locationObjects,
      currentUserLocationId
    );
    setLocations(convertedLocations);
  };

  useEffect(() => {
    SetCurrentUserLocation();
  }, []);

  useEffect(() => {
    SetLocationsFromUrl();
  }, [location.search]);

  return {
    state: { hasCreateForm, locations },
    actions: {
      CreateFormHandler,
      ChangeUserCurrentLocation,
      AddLocation,
      DeleteLocation,
      ResetUrl,
      GetLocationsFromUrl,
      AddComment,
      SetLocationsFromUrl
    }
  };
};
