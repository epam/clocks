export const CheckForCityExistence = (locations, locationId) => {
    return !!locations.find(location => location.startsWith(locationId));
};
