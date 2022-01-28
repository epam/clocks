import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IUrlLocations, IUrlLocation, ILocation, IInitialState } from '../redux/types';

const useLocations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { locationsDB } = useSelector((state: IInitialState) => state);

  const urlLocations = searchParams.get('locations');

  const locations = useMemo(
    (): IUrlLocations => urlLocations && JSON.parse(urlLocations),
    [urlLocations]
  );

  const setLocations = (newLocations: IUrlLocations) => {
    if (!!Object.keys(newLocations).length) {
      setSearchParams({ locations: JSON.stringify(newLocations) });
    } else {
      setSearchParams({});
    }
  };

  const findLocation = (sectionLocation: IUrlLocation) => {
    const found: ILocation | undefined = locationsDB.find(
      (location: ILocation) =>
        location.city === sectionLocation.city && location.lat === sectionLocation.lat
    );

    return found;
  };

  const getLocationOffset = (timezone: string) => {
    const timeArray: any = new Date().toLocaleString('ja', { timeZone: timezone }).split(/[/\s:]/);
    timeArray.splice(1, 1, --timeArray[1]);
    const t1 = Date.UTC.apply(null, timeArray);
    const t2 = new Date().setMilliseconds(0);
    return (t2 - t1) / 60 / 1000;
  };

  return { locations, setLocations, findLocation, getLocationOffset };
};

export default useLocations;
