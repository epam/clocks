import { TTheme } from '../../redux/themeRedux/theme.interface';

export interface IDeleteModalProps {
  type: TTheme;
  isOpen: boolean;
  modalHandler: () => void;
  deleteLocation: () => void;
}
