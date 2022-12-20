import { ILocation } from '../../../../redux/types';

export interface ILaneBlockProps {
  location?: ILocation;
  clickedItem: number | null;
  clickTrigger: (index: number | null) => void;
}
