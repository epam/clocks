import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import clsx from 'clsx';

import useLocations from '../../hooks/useLocations';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { IInitialState, IUrlLocations, IUrlLocation } from '../../redux/types';
import { setUserLocation, setCounter } from '../../redux/actions';

import LocationBlock from './components/LocationBlock/LocationBlock';
import EmptyState from './components/EmptyState/EmptyState';
import AnnounceModule from './components/AnnounceModal/AnnounceModule';
import LaneMode from '../Header/components/LaneMode/LaneMode';
import LaneBlock from './components/LaneBlock/LaneBlock';

import style from './Section.module.scss';

const Section: React.FC = () => {
  const dispatch = useDispatch();
  const { locations, setLocations, findLocation, getLocationOffset } = useLocations();
  const { width } = useWindowDimensions();
  const isMobileView = width <= 600;

  const {
    counter,
    planningMode,
    laneMode,
    locations: { locationsDB }
  } = useSelector((state: IInitialState) => state);

  useEffect(() => {
    const userLocation: IUrlLocation | undefined =
      locations &&
      Object.values(locations).find((urlLocation: IUrlLocation) => urlLocation.userLocation);

    if (userLocation) {
      const find = findLocation(userLocation);

      find && dispatch(setUserLocation(find));
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const userLocation = locationsDB.sort((a, b) => {
          const first =
            Math.abs(a.lat - coords['latitude']) + Math.abs(a.lng - coords['longitude']);
          const second =
            Math.abs(b.lat - coords['latitude']) + Math.abs(b.lng - coords['longitude']);

          return first - second;
        });

        dispatch(setUserLocation(userLocation[0]));

        const locationObj: IUrlLocations = {
          ...locations,
          [userLocation[0].city + userLocation[0].lat]: {
            city: userLocation[0].city,
            lat: userLocation[0].lat,
            userLocation: true,
            offset: getLocationOffset(userLocation[0].timezone)
          }
        };

        setLocations(locationObj);
      });
    }
    // use it only when component mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch(setCounter(counter + 1)), 60000);
  }, [counter, dispatch]);

  const locationsFound = useMemo(() => {
    if (locations && !!Object.keys(locations).length) {
      const locationsArray = Object.values(locations);
      let indexOfUserLocation = 0;

      const sortedLocations = locationsArray.sort((a, b) => b.offset - a.offset);

      const userLocation = sortedLocations.find((i, idx) => {
        indexOfUserLocation = idx;
        return i.userLocation;
      });

      sortedLocations.splice(indexOfUserLocation, 1);
      sortedLocations.unshift(userLocation as IUrlLocation);

      return sortedLocations;
    }
    return null;
  }, [locations]);

  const locationsRender = useMemo(() => {
    if (locationsFound !== null) {
      if (laneMode.isOn) {
        return (
          <div className={style.laneModeViewContainer} id="laneModeViewContainer">
            <div className={style.locationsContainer}>
              {locationsFound.map((urlLocation: IUrlLocation, index: number) => {
                const find = findLocation(urlLocation);
                return (
                  <LocationBlock
                    key={nanoid()}
                    index={index}
                    location={find}
                    urlUserLocation={urlLocation.userLocation}
                  />
                );
              })}
            </div>
            <div className={style.laneBlockContainer} id="laneBlockContainer">
              {locationsFound.map((urlLocation: IUrlLocation) => {
                const find = findLocation(urlLocation);
                return <LaneBlock key={nanoid()} location={find} />;
              })}
            </div>
          </div>
        );
      }

      return locationsFound.map((urlLocation: IUrlLocation, index: number) => {
        const find = findLocation(urlLocation);
        return (
          <LocationBlock
            key={nanoid()}
            index={index}
            location={find}
            urlUserLocation={urlLocation.userLocation}
          />
        );
      });
    } else {
      return <EmptyState />;
    }
    // don't need as a dependency findLocation
    // eslint-disable-next-line
  }, [laneMode.isOn, locationsFound]);

  return (
    <div
      className={clsx({
        [style.body]: locations,
        [style.emptyBody]: !locations,
        [style.marginBottom]: planningMode.isOn,
        [style.paddingLeft]: planningMode.isOn,
        [style.laneModeView]: laneMode.isOn
      })}
    >
      {isMobileView && (
        <div className={style.mobileLaneModeButtons}>
          <LaneMode />
        </div>
      )}
      {locationsRender}
      <AnnounceModule />
    </div>
  );
};

export default Section;
