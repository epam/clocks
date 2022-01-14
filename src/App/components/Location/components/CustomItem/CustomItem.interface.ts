import { ICityData } from '../../../../lib/interfaces';
import { TTheme } from '../../../../redux/navbarRedux/navbar.interface';

export interface ICustomItemProps {
  type: TTheme;
  target: ICityData;
  onSelect: (target: ICityData) => void;
  added: boolean;
}
