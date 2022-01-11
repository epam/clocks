import { KeyboardEvent, useMemo, FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Location from '../../components/Location';
import Navbar from '../../components/Navbar';
import AddCity from '../../components/Navbar/components/AddCity';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import {
  CLOCKS_FONT,
  CLOCKS_FONTS,
  PARAM_KEYWORD,
  THEMES
} from '../../lib/constants';
import Snackbar from '../../components/Snackbar';

import styles from './Dashboard.module.scss';
import { IDashboardProps } from './Dashboard.interface';
import {
  CheckForCityExistence,
  convertData,
  getCurrentUserLocation
} from '../../handlers';
import { useUrl } from '../../hooks/useUrl';
import { useQueryParams } from '../../hooks/useQueryParams';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations/convertFromUrlLocations';

const Dashboard: FC<IDashboardProps> = ({
  type,
  autoTheming,
  setTheme,
  toggleAutoTheming,
  locations,
  ChangeUserCurrentLocation,
  SetLocations,
  snackbar,
  visibility,
  message,
  snackbarType
}) => {
  const [isAddCitySidebarOpen, setIsAddCitySidebarOpen] =
    useState<boolean>(false);
  const location = useLocation();
  const { getItem } = useLocalStorage();
  const { AddLocation } = useUrl();
  const { GetParam, SetParam } = useQueryParams();

  const addCitySidebarHandler = () => {
    setIsAddCitySidebarOpen(prev => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '=' || event.key === '+') {
      addCitySidebarHandler();
      event.preventDefault();
    }
  };

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
      tabIndex={0}
      role="button"
      onKeyPress={handleKeyDown}
      className={`${styles.body} ${clocksFont}`}
    >
      <Navbar
        type={type}
        autoTheming={autoTheming}
        setTheme={setTheme}
        toggleAutoTheming={toggleAutoTheming}
        snackbar={snackbar}
        locations={locations}
        addCitySidebarHandler={addCitySidebarHandler}
      />
      <div
        className={`${styles.container} ${clsx({
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
                snackbar={snackbar}
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
      </div>
      <AddCity
        type={type}
        visibility={isAddCitySidebarOpen}
        visibilityHandler={addCitySidebarHandler}
      />
      <Snackbar
        visibility={visibility}
        type={snackbarType}
        message={message}
        snackbar={snackbar}
      />
    </div>
  );
};

export default Dashboard;
