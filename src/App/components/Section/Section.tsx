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
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
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
          },
          error => {
            if (error.code === 1) {
              const find = findLocation(Object.values(locations).at(0) as IUrlLocation);

              if (find) {
                dispatch(setUserLocation(find));

                const locationObj: IUrlLocations = {
                  ...locations,
                  [find.city + find.lat]: {
                    city: find.city,
                    lat: find.lat,
                    userLocation: true,
                    offset: getLocationOffset(find.timezone)
                  }
                };

                setLocations(locationObj);
              }
            }
          }
        );
      }
    }
    // use it only when component mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimeout(() => dispatch(setCounter(counter + 1)), 60000);
  }, [counter, dispatch]);

  const locationsFound = useMemo(() => {
    const locationsArray = locations ? Object.values(locations) : [];
    if (locations && locationsArray.length) {
      const sortedLocations = locationsArray.sort((a, b) => b.offset - a.offset);

      if (locationsArray.length > 1 && locationsArray.some(i => i.userLocation)) {
        let activeLocationIndex = 0;

        const activeLocation = locationsArray.find((item, idx) => {
          activeLocationIndex = idx;
          return item.userLocation;
        });

        sortedLocations.splice(activeLocationIndex, 1);
        sortedLocations.unshift(activeLocation as IUrlLocation);

        return sortedLocations;
      }
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
    }
    return <EmptyState />;
    // don't need as a dependency findLocation
    // eslint-disable-next-line
  }, [laneMode.isOn, locationsFound]);

  return (
    <div
      className={clsx({
        [style.body]: locationsFound,
        [style.emptyBody]: !locationsFound,
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
