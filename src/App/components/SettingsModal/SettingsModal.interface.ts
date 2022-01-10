import { Dispatch, SetStateAction } from 'react';
import { IAppLocation } from '../../redux/locationsRedux/locations.interface';

export interface ISettingsModalProps {
  locations: IAppLocation[];
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}
