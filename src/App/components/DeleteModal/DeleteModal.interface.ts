import { TTheme } from '../../redux/navbarRedux/navbar.interface';

export interface IDeleteModalProps {
  type: TTheme;
  isOpen: boolean;
  modalHandler: () => void;
  deleteLocation: () => void;
}
