import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { ILocationBlockProps } from './LocationBlock.types';
import DragDropContainer from './components/DragDropContainer/DragDropContainer';
import DeleteButton from './components/DeleteButton/DeleteButton';
import PinButton from './components/PinButton/PinButton';
import LocationInfo from './components/LocationInfo/LocationInfo';
import CommentButton from './components/CommentButton/CommentButton';
import Comment from './components/Comment/Comment';
import { IInitialState } from '../../../../redux/types';

import style from './LocationBlock.module.scss';

const LocationBlock: React.FC<ILocationBlockProps> = ({
  location,
  urlUserLocation,
  selectedLocation,
  setSelectedLocation,
  index
}) => {
  console.log('🚀 ~ file: LocationBlock.tsx ~ line 26 ~ selectedLocation', selectedLocation);

  const [isFocused, setIsFocused] = useState(false);

  const { deleteMode, onboarding } = useSelector((state: IInitialState) => state);
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const focusHandler = () => {
    setIsFocused(isFocused => !isFocused);
  };
  return (
    <DragDropContainer
      index={index}
      location={location}
      urlUserLocation={urlUserLocation}
      setSelectedLocation={setSelectedLocation}
      selectedLocation={selectedLocation}
    >
      {deleteMode.isOn && <DeleteButton location={location} />}
      <div
        className={clsx({
          [style.blockContainer]: true,
          [style.onboarding]:
            !index && (onboarding?.dragDropMode || onboarding?.myLocation || onboarding?.comment)
        })}
        onFocus={focusHandler}
        onMouseEnter={focusHandler}
        onMouseLeave={focusHandler}
        onBlur={focusHandler}
      >
        <div
          className={clsx({
            [style.leftSide]: true,
            [style.opaccityBlock]: !isFocused && !isUserLocation
          })}
        >
          <PinButton location={location} urlUserLocation={urlUserLocation} index={index} />
          <CommentButton location={location} index={index} />
        </div>
        <div className={style.rightSide}>
          <LocationInfo location={location} />
        </div>
      </div>
      <Comment location={location} />
    </DragDropContainer>
  );
};

export default LocationBlock;
