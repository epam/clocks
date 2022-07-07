import React, { DragEvent, RefObject, useRef } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import { IInitialState } from '../../../../../../redux/types';
import generateLocationKey from '../../../../../../utils/generateLocationKey';
import addClassName from '../../../../../../utils/addClassName';
import removeClassName from '../../../../../../utils/removeClassName';
import useLocations from '../../../../../../hooks/useLocations';

import style from '../../LocationBlock.module.scss';
import { IRightBlockProps } from './RightBlock.types';

const RightBlock: React.FC<IRightBlockProps> = ({ selectedLocation, location }) => {
  const rightBlockRef = useRef<HTMLDivElement>(null);

  const { dragAndDropLocation } = useLocations();

  const { dragDropMode } = useSelector((state: IInitialState) => state);

  const blockDragEnterHandler = (blockRef: RefObject<HTMLDivElement>) => {
    if (!selectedLocation || !location) {
      throw new Error('Dragged location or dropped block location is null');
    }
    const selectedLocationKey = generateLocationKey(selectedLocation);
    const currentLocationKey = generateLocationKey(location);
    if (selectedLocationKey !== currentLocationKey) {
      addClassName(blockRef, style.bgGray);
    }
  };

  const dragLeaveHandler = (blockRef: RefObject<HTMLDivElement>) => {
    removeClassName(blockRef, style.bgGray);
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    removeClassName(rightBlockRef, style.bgGray);

    if (selectedLocation && location) {
      dragAndDropLocation(selectedLocation, location);
    }
  };

  return (
    <>
      <div
        ref={rightBlockRef}
        className={clsx({
          [style.rightBlock]: true,
          [style.behind]: selectedLocation === null
        })}
        draggable={dragDropMode.isOn}
        onDragEnter={_ => blockDragEnterHandler(rightBlockRef)}
        onDragLeave={_ => dragLeaveHandler(rightBlockRef)}
        onDragOver={e => e.preventDefault()}
        onDrop={dropHandler}
      >
        <div className={style.innerBlock} />
      </div>
    </>
  );
};

export default RightBlock;
