import { Dispatch, SetStateAction } from 'react';
import { IAppLocation } from '../../lib/interfaces';

export interface ISettingsModalProps {
  locations: IAppLocation[];
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
}
