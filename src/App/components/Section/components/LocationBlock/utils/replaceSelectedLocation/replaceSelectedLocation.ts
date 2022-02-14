import { IUrlLocation } from '../../../../../../redux/types';

export default function replaceSelectedLocation(
  locations: IUrlLocation[],
  keys: {
    selectedLocationKey: string;
    currentLocationKey: string;
  },
  selectedLocationObj: IUrlLocation
) {
  const newLocations: { [key: string]: IUrlLocation } = {};
  Object.entries(locations).forEach(([key, item]) => {
    if (key !== keys.selectedLocationKey) {
      newLocations[`${key}`] = item;
    }
    if (key === keys.currentLocationKey) {
      newLocations[keys.selectedLocationKey] = selectedLocationObj;
    }
  });

  return newLocations;
}
