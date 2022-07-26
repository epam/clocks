import React from 'react';

import useLocations from '../../../../../../hooks/useLocations';

import { ICommentProps } from './Comment.types';
import style from './Comment.module.scss';

const Comment: React.FC<ICommentProps> = ({ location }) => {
  const { locations } = useLocations();

  return (
    <>
      {location && locations[location.city + location.lat].comment && (
        <div className={style.commentBlock}>{locations[location.city + location.lat].comment}</div>
      )}
    </>
  );
};

export default Comment;
