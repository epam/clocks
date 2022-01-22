import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IUrlLocations, IUrlLocation, ILocation, IInitialState } from '../redux/types';

const useLocations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { locationsDB } = useSelector((state: IInitialState) => state);

  const urlLocations = searchParams.get('locations');

  const locations: IUrlLocations = urlLocations && JSON.parse(urlLocations);

  const setLocations = (newLocations: IUrlLocations) => {
    if (!!Object.keys(newLocations).length) {
      setSearchParams({ locations: JSON.stringify(newLocations) });
    } else {
      setSearchParams({});
    }
  };

  const findLocation = (userLocation: IUrlLocation) => {
    const found: ILocation | undefined = locationsDB.find(
      (location: ILocation) =>
        location.city === userLocation.city && location.lat === userLocation.lat
    );

    return found;
  };

  return { locations, setLocations, findLocation };
};

export default useLocations;
