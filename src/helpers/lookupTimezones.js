import { cityMapping } from 'city-timezones';

const lookupTimezones = timezone => {
    if (!timezone) return [];
    const tzLookup = cityMapping.filter(o => {
        return o.timezone?.toLowerCase() === timezone.toLowerCase();
    });
    if (tzLookup && tzLookup.length) {
        return tzLookup;
    }
    return [];
};

export default lookupTimezones;
