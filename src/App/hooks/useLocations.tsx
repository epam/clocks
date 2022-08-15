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

  const navigate = useNavigate();

  const { snackbarError } = useSnackbar();

  const { t } = useTranslation();

  let parsedLocations = localStorage.getItem('locations') as string;

  const locations = useMemo((): IUrlLocations => {
    try {
      if (urlLocations) {
        localStorage.setItem('locations', urlLocations);
        return JSON.parse(decodeURIComponent(escape(window.atob(urlLocations))));
      } else if (parsedLocations) {
        setSearchParams({ locations: parsedLocations });
        return JSON.parse(decodeURIComponent(escape(window.atob(parsedLocations))));
      } else {
        return {} as IUrlLocations;
      }
    } catch {
      setError(true);
      return {} as IUrlLocations;
    }
  }, [urlLocations, setSearchParams, parsedLocations]);

  useEffect(() => {
    if (parsedLocations) {
      setSearchParams({ locations: parsedLocations });
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
