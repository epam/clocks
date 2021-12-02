import { ICityData } from '../../types/timezones';
import cityMapping from '../../constants/cityMapping';

function findPartialMatch(itemsToSearch: string[], searchString: string): boolean {
    const regexp = new RegExp(searchString.toLowerCase(), 'gi');
    return regexp.test(itemsToSearch.join().toLowerCase());
}

function lookupCityAscii(searchString: string): ICityData[] {
    if (searchString) {
        const cityLookup = cityMapping.filter((o: ICityData) => {
            return findPartialMatch([o.city, o.city_ascii, o.names, o.province, o.country], searchString);
        });
        if (cityLookup && cityLookup.length) {
            return cityLookup;
        }
        return [];
    }
    return [];
}

export default lookupCityAscii;
