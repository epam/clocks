import { ILocation } from '../../redux/types';

export default function generateLocationKey(location: ILocation) {
  return location.city + location.lat;
}
