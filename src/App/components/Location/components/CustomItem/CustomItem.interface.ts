import { ICityData } from '../../../../lib/interfaces';
import { TTheme } from '../../../../redux/themeRedux/theme.interface';

export interface ICustomItemProps {
  type: TTheme;
  target: ICityData;
  onSelect: (target: ICityData) => void;
  added: boolean;
}
