import { ICityData } from '../../lib/interfaces';

export interface ICustomItemProps {
  target: ICityData;
  onSelect: (target: ICityData) => void;
  added: boolean;
}
