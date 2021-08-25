const convertFromUrlLocations = locations => {
    if (!Array.isArray(locations)) {
        return console.error('Locations must be array!');
    }
    return locations.reduce((res, location) => {
        const data = location.split('_');
        const newLocation = {
            city_ascii: data[0],
            iso2: data[1],
            lat: data[2],
            lng: data[3],
            message: data[5] || ''
        };
        return [...res, newLocation];
    }, []);
};

export default convertFromUrlLocations;
