import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useSnackbar from './useSnackbar';
import { IUrlLocations, IUrlLocation, ILocation, IInitialState } from '../redux/types';

const useLocations = () => {
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { locationsDB } = useSelector((state: IInitialState) => state.locations);

  const urlLocations = searchParams.get('locations');
  const savedLocation = localStorage.getItem('locations');

  const navigate = useNavigate();

  const { snackbarError } = useSnackbar();

  const { t } = useTranslation();

  const createLocationsObj = (savedLocationsURL: string): IUrlLocations => {
    const decodedLocations = JSON.parse(decodeURIComponent(escape(window.atob(savedLocationsURL))));
    let locationsObj = {};
    decodedLocations.map((i: string) => {
      const location = i.split('|');
      const find = locationsDB.find(
        loc => loc.city === location[0] && loc.lat === Number(location[1])
      );
      if (find) {
        return (locationsObj = {
          ...locations,
          [location[0] + location[1]]: {
            city: location[0],
            lat: Number(location[1]),
            comment: location[2],
            userLocation: Number(location[3]) === 1,
            offset: getLocationOffset(find.timezone)
          }
        });
      }
      return locationsObj;
    });
    return locationsObj;
  };

  const locations = useMemo((): IUrlLocations => {
    try {
      if (!urlLocations && savedLocation) {
        const createdLocs = createLocationsObj(savedLocation);
        console.log(createdLocs);
        return createdLocs;
      }

      const createdLocs = createLocationsObj(urlLocations as string);
      console.log(createdLocs);
      return createdLocs;
    } catch {
      setError(true);
      return {} as IUrlLocations;
    }
  }, [urlLocations, savedLocation]);

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
      let formattedNewLocations: string[] = [];
      Object.values(newLocations).forEach(i => {
        formattedNewLocations.push(
          `${i.city}|${i.lat}|${i.comment || ''}|${!!i.userLocation ? 1 : 0}`
        );
      });

      const encodedNewLocation = btoa(
        unescape(encodeURIComponent(JSON.stringify(formattedNewLocations)))
      );

      localStorage.setItem('locations', encodedNewLocation);
      setSearchParams({
        locations: encodedNewLocation
      });
    } else {
      localStorage.removeItem('locations');
      setSearchParams('');
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
