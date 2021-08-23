import { cityMapping } from 'city-timezones';

function findPartialMatch(itemsToSearch, searchString) {
    const searchItems = searchString.split(' ');
    return searchItems.every(i => {
        return itemsToSearch.join().toLowerCase().indexOf(i.toLowerCase()) >= 0;
    });
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
