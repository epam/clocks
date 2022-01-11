import { TTheme } from '../../../../redux/themeRedux/theme.interface';

export interface IInputDrawerProps {
  type: TTheme;
  visibility: boolean;
  visibilityHandler: () => void;
}
