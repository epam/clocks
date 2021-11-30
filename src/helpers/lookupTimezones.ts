import CityData from '../types/city-timezones';
import cityMapping from '../constants/cityMapping';

const lookupTimezones = (timezone: string): CityData[] => {
    if (!timezone) return [];
    const tzLookup: CityData[] = cityMapping.filter((o: CityData) => {
        return o.timezone?.toLowerCase() === timezone.toLowerCase();
    });
    if (tzLookup && tzLookup.length) {
        return tzLookup;
    }
    return [];
};

export default lookupTimezones;
