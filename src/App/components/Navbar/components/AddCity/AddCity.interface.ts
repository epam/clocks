import { TTheme } from '../../../../redux/navbarRedux/navbar.interface';

export interface IInputDrawerProps {
  type: TTheme;
  visibility: boolean;
  visibilityHandler: () => void;
}
