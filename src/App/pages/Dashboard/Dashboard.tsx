import { useMemo, FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Location from '../../components/Location';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { CLOCKS_FONT, CLOCKS_FONTS } from '../../lib/constants';
import Snackbar from '../../components/Snackbar';
import {
  CheckForCityExistence,
  convertData,
  getCurrentUserLocation
} from '../../handlers';
import { useUrl } from '../../hooks/useUrl';
import { useQueryParams } from '../../hooks/useQueryParams';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations/convertFromUrlLocations';
import { PARAM_KEYWORD } from '../../redux/locationsRedux/locations.constants';

import styles from './Dashboard.module.scss';
import { IDashboardProps } from './Dashboard.interface';
import { THEMES } from '../../redux/navbarRedux/navbar.constants';

const Dashboard: FC<IDashboardProps> = ({
  type,
  className,
  locations,
  ChangeUserCurrentLocation,
  SetLocations,
  snackbarHandler,
  visibility,
  message,
  snackbarType
}) => {
  const location = useLocation();
  const { getItem } = useLocalStorage();
  const { AddLocation } = useUrl();
  const { GetParam, SetParam } = useQueryParams();

  const addCurrentUserLocationInInitialLoad = async () => {
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

  const setLocationsFromUrl = async () => {
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
    SetLocations(convertedLocations);
  };

  const clocksFont = useMemo<string>(
    () => getItem(CLOCKS_FONT) || CLOCKS_FONTS.ROBOTO.value,
    [locations]
  );

  useEffect(() => {
    addCurrentUserLocationInInitialLoad();
  }, []);

  useEffect(() => {
    setLocationsFromUrl();
  }, [location.search]);

  return (
    <div
      className={`${clocksFont} ${className} ${styles.container} ${clsx({
        [styles['container-light']]: type === THEMES.light,
        [styles['container-dark']]: type === THEMES.dark
      })}`}
    >
      {locations && locations?.length > 0 ? (
        locations.map((props, index) => (
          <div key={index}>
            <Location
              visibility={visibility}
              type={type}
              snackbar={snackbarHandler}
              changeUserCurrentLocation={ChangeUserCurrentLocation}
              {...props}
            />
          </div>
        ))
      ) : (
        <div
          className={clsx(styles.noCities, {
            [styles.noCitiesLight]: type === THEMES.light,
            [styles.noCitiesDark]: type === THEMES.dark
          })}
        >
          No active cities
        </div>
      )}
      <Snackbar
        visibility={visibility}
        type={snackbarType}
        message={message}
        snackbar={snackbarHandler}
      />
    </div>
  );
};

export default Dashboard;
