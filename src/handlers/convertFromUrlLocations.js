const convertFromUrlLocations = (locations, currentUserLocationId) => {
    if (!Array.isArray(locations)) {
        return console.error('Locations must be array!');
    }
    if (!currentUserLocationId) {
        return console.error('Current user location id is not provided');
    }
    return locations.reduce((res, location) => {
        const data = location.split('__');
        const id = data[0];
        const newLocation = {
            id,
            message: data[1] || '',
            host: false
        };
        if (id === currentUserLocationId) {
            newLocation.host = true;
        }
        return [...res, newLocation];
    }, []);
};

export default convertFromUrlLocations;
