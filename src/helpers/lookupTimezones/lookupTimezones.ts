import { cityMapping } from '../../constants';
import { ICityData } from '../../types/timezones';

const lookupTimezones = (timezone: string): ICityData[] => {
  if (!timezone) return [];
  const tzLookup: ICityData[] = cityMapping.filter((o: ICityData) => {
    return o.timezone?.toLowerCase() === timezone.toLowerCase();
  });
  if (tzLookup && tzLookup.length) {
    return tzLookup;
  }
  return [];
};

export default lookupTimezones;
