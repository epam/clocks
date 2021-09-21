import { cityMapping } from 'city-timezones';

function findPartialMatch(itemsToSearch, searchString) {
    const regexp = new RegExp(searchString.toLowerCase(), 'gi');
    return regexp.test(itemsToSearch.join().toLowerCase());
}

function lookupCityAscii(searchString) {
    if (searchString) {
        const cityLookup = cityMapping.filter(o => {
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
