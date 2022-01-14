import { Dispatch, SetStateAction } from 'react';
import { IFont } from '../../../../redux/navbarRedux/navbar.interface';

export interface IFontSelectorProps {
  font: IFont;
  changeHandler: Dispatch<SetStateAction<string>>;
}
