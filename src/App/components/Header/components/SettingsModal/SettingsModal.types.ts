import { ChangeEvent } from 'react';
import { IActionSettingsPayload } from '../../../../redux/types';

export interface IBlocksProps {
  localSettings: IActionSettingsPayload;
  handleSetSettings: (e: ChangeEvent<HTMLInputElement>) => void;
}
