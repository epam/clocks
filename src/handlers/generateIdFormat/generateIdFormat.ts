import { TCityAscii, TIso2, TLat, TLng, TLocationId } from '../../types/location';

const generateIdFormat = (cityAscii: TCityAscii, iso2: TIso2, lat: TLat, lng: TLng): TLocationId => {
    if (!(cityAscii && iso2 && lat && lng)) {
        return '';
    }
    if (
        typeof cityAscii !== 'string' ||
        typeof iso2 !== 'string' ||
        typeof lat !== 'number' ||
        typeof lng !== 'number'
    ) {
        return '';
    }
    return [cityAscii, iso2, Math.floor(Math.abs(lat)), Math.floor(Math.abs(lng))].join('_');
};

export default generateIdFormat;
