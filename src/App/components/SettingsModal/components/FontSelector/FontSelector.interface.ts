import { Dispatch, SetStateAction } from 'react';
import { IFont } from '../../../../redux/navbarRedux/locations.interface';

export interface IFontSelectorProps {
  font: IFont;
  changeHandler: Dispatch<SetStateAction<string>>;
  className: string;
}
