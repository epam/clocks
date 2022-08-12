import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useSnackbar from './useSnackbar';
import { IUrlLocations, IUrlLocation, ILocation, IInitialState } from '../redux/types';
import generateLocationKey from '../utils/generateLocationKey';

const useLocations = () => {
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { locationsDB } = useSelector((state: IInitialState) => state.locations);

  const urlLocations = searchParams.get('locations');

  const navigate = useNavigate();

  const { snackbarError } = useSnackbar();

  const { t } = useTranslation();

  const locations = useMemo((): IUrlLocations => {
    try {
      if (localStorage.getItem('locations')) {
        return JSON.parse(
          decodeURIComponent(escape(window.atob(localStorage.getItem('locations') as string)))
        );
      } else {
        return urlLocations && JSON.parse(decodeURIComponent(escape(window.atob(urlLocations))));
      }
    } catch {
      setError(true);
      return {} as IUrlLocations;
    }
  }, [urlLocations]);

  useEffect(() => {
    if (localStorage.getItem('locations')) {
      setSearchParams({ locations: localStorage.getItem('locations') as string });
    }
  }, []);

  useEffect(() => {
    if (error) {
      navigate('/');
      setError(false);
      snackbarError(t('UseLocations.SnackbarMessage'));
    }
    // don't need as a dependency navigate, locations, snackbarError and t
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const setLocations = (newLocations: IUrlLocations) => {
    if (!!Object.keys(newLocations).length) {
      localStorage.setItem(
        'locations',
        btoa(unescape(encodeURIComponent(JSON.stringify(newLocations))))
      );
      setSearchParams({
        locations: btoa(unescape(encodeURIComponent(JSON.stringify(newLocations))))
      });
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
