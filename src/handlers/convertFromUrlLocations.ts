import { IUrlLocation } from '../types/location';

const convertFromUrlLocations = (locations: string[] = []): IUrlLocation[] => {
    if (!Array.isArray(locations)) {
        return [];
    }
    return locations.reduce((res: IUrlLocation[], location: string) => {
        const data = location.split('__');
        const id = data[0];
        const newLocation: IUrlLocation = {
            id,
            message: data[1] || ''
        };
        return [...res, newLocation];
    }, []);
};

export default convertFromUrlLocations;
