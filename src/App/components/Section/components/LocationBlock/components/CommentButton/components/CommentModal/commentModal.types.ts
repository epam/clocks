import { ILocation } from '../../../../../../../../redux/types';

export interface ICommentModuleProps {
  location?: ILocation;
  commentModal: boolean;
  handleClose: () => void;
}
