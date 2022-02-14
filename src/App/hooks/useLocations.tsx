import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IUrlLocations, IUrlLocation, ILocation, IInitialState } from '../redux/types';
import { generateLocationKey } from '../utils';

const useLocations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { locationsDB } = useSelector((state: IInitialState) => state.locations);

  const urlLocations = searchParams.get('locations');

  const locations = useMemo(
    (): IUrlLocations => urlLocations && JSON.parse(atob(urlLocations)),
    [urlLocations]
  );

  const setLocations = (newLocations: IUrlLocations) => {
    if (!!Object.keys(newLocations).length) {
      setSearchParams({ locations: btoa(JSON.stringify(newLocations)) });
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

  const dragAndDropLocation = (draggedLocation: ILocation, droppedBlockLocation: ILocation) => {
    const locationObj: IUrlLocation = {
      city: draggedLocation.city,
      lat: draggedLocation.lat,
      offset: getLocationOffset(draggedLocation.timezone)
    };

    const selectedLocationKey: string = generateLocationKey(draggedLocation);
    const currentLocationKey: string = generateLocationKey(droppedBlockLocation);

    const newLocations = Object.entries(locations).reduce(
      (newLocations: IUrlLocations, [key, item]) => {
        if (key !== selectedLocationKey) {
          newLocations[`${key}`] = item;
        }
        if (key === currentLocationKey) {
          newLocations[selectedLocationKey] = locationObj;
        }
        return newLocations;
      },
      {}
    );

    setLocations(newLocations);
  };

  const getLocationOffset = (timezone: string) => {
    const timeArray: any = new Date().toLocaleString('ja', { timeZone: timezone }).split(/[/\s:]/);
    timeArray.splice(1, 1, --timeArray[1]);
    const t1 = Date.UTC.apply(null, timeArray);
    const t2 = new Date().setMilliseconds(0);
    return (t2 - t1) / 60 / 1000;
  };

  return { locations, setLocations, findLocation, getLocationOffset, dragAndDropLocation };
};

export default useLocations;
