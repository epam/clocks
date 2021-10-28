export const CheckForCityExistence = (locations: string[], locationId: string): boolean => {
    return !!locations.find(location => location.startsWith(locationId));
};
