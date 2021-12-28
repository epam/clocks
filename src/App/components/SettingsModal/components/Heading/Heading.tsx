import { FC } from 'react';
import { Typography } from '@material-ui/core';

import { EyeButton } from '../EyeButton';
import { IHeadingProps } from './Heading.interface';

const Heading: FC<IHeadingProps> = ({
  children,
  eyeIsOpen,
  eyeHandler,
  className
}) => {
  return (
    <Typography paragraph variant="subtitle2" className={className}>
      {children} <EyeButton isOpen={eyeIsOpen} eyeHandler={eyeHandler} />
    </Typography>
  );
};

export default Heading;
