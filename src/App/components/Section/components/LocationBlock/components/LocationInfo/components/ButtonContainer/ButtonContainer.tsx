import React, { useState } from 'react';
import clsx from 'clsx';

import CommentButton from '../../../CommentButton/CommentButton';
import CommentModal from '../../../CommentButton/components/CommentModal/CommentModal';
import PinButton from '../../../PinButton/PinButton';

import style from '../../../../LocationBlock.module.scss';
import { IButtonContainerProps } from './ButtonContainer.types';

const ButtonContainer: React.FC<IButtonContainerProps> = ({
  location,
  index,
  urlUserLocation,
  isFocused,
  isUserLocation
}: any) => {
  const [commentModal, setCommentModal] = useState(false);

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModal(false);
  };

  return (
    <>
      <div
        className={clsx({
          [style.buttonContainer]: true,
          [style.opaccityBlock]: !isFocused && !isUserLocation
        })}
      >
        <PinButton location={location} index={index} urlUserLocation={urlUserLocation} />
        <CommentButton
          children={
            <CommentModal
              commentModal={commentModal}
              handleClose={handleCloseCommentModal}
              location={location}
            />
          }
          index={index}
          openCommentModal={handleOpenCommentModal}
        />
      </div>
    </>
  );
};

export default ButtonContainer;
