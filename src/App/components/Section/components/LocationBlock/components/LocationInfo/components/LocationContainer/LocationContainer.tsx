import React from 'react';

import { useSelector } from 'react-redux';
import { IInitialState } from '../../../../../../../../redux/types';

import style from '../../../../LocationBlock.module.scss';
import { ILocationContainerProps } from './LocationContainer.types';

const LocationContainer: React.FC<ILocationContainerProps> = ({ location }) => {
  const { showCountry } = useSelector((state: IInitialState) => state.settings);
  return (
    <>
      <div className={style.infoContainer}>
        <div className={style.topInfo}>{location?.city}</div>
        <div className={style.bottomInfo}>{showCountry && location?.country}</div>
      </div>
    </>
  );
};

export default LocationContainer;
