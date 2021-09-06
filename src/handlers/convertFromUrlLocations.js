const convertFromUrlLocations = locations => {
    if (!Array.isArray(locations)) {
        return console.error('Locations must be array!');
    }
    return locations.reduce((res, location) => {
        const data = location.split('__');
        const id = data[0];
        const newLocation = {
            id,
            message: data[1] || ''
        };
        return [...res, newLocation];
    }, []);
};

export default convertFromUrlLocations;