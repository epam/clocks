import React from 'react';

import { ILocationBlockProps } from './LocationBlock.types';
import DragDropContainer from './components/DragDropContainer/DragDropContainer';
import DeleteButton from './components/DeleteButton/DeleteButton';
import PinButton from './components/PinButton/PinButton';
import CommentModal from './components/CommentModal/CommentModal';
import LocationInfo from './components/LocationInfo/LocationInfo';

const LocationBlock: React.FC<ILocationBlockProps> = ({
  location,
  urlUserLocation,
  selectedLocation,
  setSelectedLocation,
  index
}) => {
  console.log('🚀 ~ file: LocationBlock.tsx ~ line 26 ~ selectedLocation', selectedLocation);

  return (
    <DragDropContainer
      index={index}
      location={location}
      urlUserLocation={urlUserLocation}
      setSelectedLocation={setSelectedLocation}
      selectedLocation={selectedLocation}
    >
      <DeleteButton location={location} />
      <PinButton location={location} urlUserLocation={urlUserLocation} index={index} />
      <CommentModal location={location} index={index} />
      <LocationInfo location={location} />
    </DragDropContainer>
  );
};

export default LocationBlock;
