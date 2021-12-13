import { ICityData } from '../../types/timezones';

export interface ICustomItemProps {
  target: ICityData;
  onSelect: (target: ICityData) => void;
  added: boolean;
}
