import React from 'react';

import style from './LocationBlock.module.scss';
import { ILocationBlockProps } from './LocationBlock.types';
import LocationInfo from './components/LocationInfo/LocationInfo';
import RightBlock from './components/RightBlock/RightBlock';

const LocationBlock: React.FC<ILocationBlockProps> = ({
  location,
  urlUserLocation,
  selectedLocation,
  setSelectedLocation,
  index
}) => {
  console.log('🚀 ~ file: LocationBlock.tsx ~ line 26 ~ selectedLocation', selectedLocation);

  return (
    <div className={style.relativeBlock}>
      <LocationInfo
        index={index}
        location={location}
        urlUserLocation={urlUserLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <RightBlock selectedLocation={selectedLocation} location={location} />
    </div>
  );
};

export default LocationBlock;
