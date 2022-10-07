import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useLocations from '../../hooks/useLocations';
import { IInitialState, IUrlLocations, IUrlLocation } from '../../redux/types';
import { setUserLocation, setCounter } from '../../redux/actions';
import clsx from 'clsx';

import style from './Section.module.scss';
import LocationBlock from './components/LocationBlock/LocationBlock';
import EmptyState from './components/EmptyState/EmptyState';
import AnnounceModule from './components/AnnounceModal/AnnounceModule';
import generateTime from '../../utils/generateTime';
import useTimeInfo from '../../hooks/useTimeInfo';
import { nanoid } from 'nanoid';

const Section: React.FC = () => {
  const dispatch = useDispatch();
  const { locations, setLocations, findLocation, getLocationOffset } = useLocations();

  const {
    counter,
    planningMode,
    laneMode,
    timeTable,
    locations: { locationsDB }
  } = useSelector((state: IInitialState) => state);

  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  // console.log('locationsDB', locationsDB);
  // console.log('UserLocation', userLocation);

  const [generatedTimeTable, setGeneratedTimeTable] = useState<any[]>([]);

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

  const locationsRender = useMemo(() => {
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

      return sortedLocations.map((urlLocation: IUrlLocation, index: number) => {
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
  }, [locations, laneMode]);

  useEffect(() => {
    console.log('timeTable', timeTable);
    const timeTables = timeTable.map(i => generateTime(24, 30, +i.hours + 1, 23));
    const res: any[] = [];
    let loopCount = 0;
    timeTables.forEach(time => {
      if (time.length > loopCount) {
        loopCount = time.length;
      }
    });

    const arrayColumn = (arr: any[], n: number) => arr.map(x => x[n]);

    for (let i = 0; i < loopCount; i++) {
      let column = arrayColumn(timeTables, i);
      res.push(column);
    }

    setGeneratedTimeTable(res);
  }, [laneMode, timeTable]);

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
      {laneMode.isOn ? (
        <div className={style.laneModeViewContainer}>
          <div>{locationsRender}</div>
          <div className={style.timeTable}>
            {/* {timeTable.map((timeRow, idx) => ( */}
            {/* <div key={idx} className={style.timeRow}> */}
            {/* @ts-ignore */}
            {/* {timeRow.map((timeColumn, index) => { */}
            {/* return ( */}
            {/* <div key={index} className={style.timeColumn}> */}
            {/* {timeColumn} */}
            {/* </div> */}
            {/* ); */}
            {/* })} */}
            {/* </div> */}
            {/* ))} */}

            {generatedTimeTable.map((timeCol, idx) => (
              <div key={nanoid()} className={style.timeCol}>
                {timeCol.map((time: any) => {
                  return (
                    <div key={nanoid()} className={style.timeCell}>
                      {time}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ) : (
        locationsRender
      )}
      <AnnounceModule />
    </div>
  );
};

export default Section;
