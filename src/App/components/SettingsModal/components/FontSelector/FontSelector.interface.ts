import { Dispatch, SetStateAction } from 'react';

export interface IFontSelectorProps {
  font: string;
  changeHandler: Dispatch<SetStateAction<string>>;
}
