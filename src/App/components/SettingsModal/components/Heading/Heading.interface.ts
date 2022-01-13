import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export interface IHeadingProps {
  eyeIsOpen: boolean;
  eyeHandler: ActionCreatorWithPayload<any, string>;
  className?: string;
}
