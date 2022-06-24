import { Dispatch, SetStateAction } from 'react';
import { ILocation } from '../../../../../../redux/types';

export interface IDrawerBlockProps {
  setSearchText: Dispatch<SetStateAction<string>>;
  setPanel: Dispatch<SetStateAction<boolean>>;
  setLocationsFound: Dispatch<SetStateAction<ILocation[]>>;
  isPanelOpen: boolean;
  searchText: string;
  locationsFound: ILocation[];
}
