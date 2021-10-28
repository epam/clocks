import { CityData } from 'city-timezones';
import cityMapping from '../constants/cityMapping';

function findPartialMatch(itemsToSearch: string[], searchString: string): boolean {
    const regexp = new RegExp(searchString.toLowerCase(), 'gi');
    return regexp.test(itemsToSearch.join().toLowerCase());
}

function lookupCityAscii(searchString: string): CityData[] {
    if (searchString) {
        const cityLookup = cityMapping.filter((o: CityData) => {
            return findPartialMatch([o.city, o.city_ascii, o.province, o.country], searchString);
        });
        if (cityLookup && cityLookup.length) {
            return cityLookup;
        }
        return [];
    }
    return [];
}

export default lookupCityAscii;
