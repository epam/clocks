import { Dispatch, SetStateAction } from 'react';

export interface IHeadingProps {
  eyeIsOpen: boolean;
  eyeHandler: Dispatch<SetStateAction<boolean>>;
  className?: string;
}
