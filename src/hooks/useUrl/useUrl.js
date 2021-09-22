import { useContext } from 'react';
import { useQueryParams } from '../useQueryParams/useQueryParams';
import { getCurrentUserLocation, generateIdFormat } from '../../handlers';
import { CheckForCityExistence } from '../../helpers/checkCityExistence';
import { SnackbarContext } from '../../context/snackbar';
import { PARAM_KEYWORD } from '../../constants';

export const useUrl = () => {
    const { SetParam, GetParam } = useQueryParams();
    const {
        actions: { OpenSnackbar }
    } = useContext(SnackbarContext);

    const AddLocation = ({ cityAscii, iso2, lat, lng, message = '' }) => {
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        const locationsFromUrl = GetParam(PARAM_KEYWORD) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const isCityAlreadyAdded = CheckForCityExistence(locationsFromUrl, locationId);
        if (isCityAlreadyAdded) {
            return OpenSnackbar('This city has already been added!');
        }
        locationsFromUrl.push(`${locationId}${message && `__${message}`}`);
        SetParam(PARAM_KEYWORD, locationsFromUrl);
    };

    const DeleteLocation = locationId => {
        if (!locationId) {
            return console.error('Id for deleting location is not valid!');
        }
        const locationsFromUrl = GetParam(PARAM_KEYWORD) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const filteredLocations = locationsFromUrl.filter(location => !location.startsWith(locationId));
        SetParam(PARAM_KEYWORD, filteredLocations);
    };

    const ResetUrl = () => {
        const { city_ascii: cityAscii, iso2, lat, lng } = getCurrentUserLocation();
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        const locations = [locationId];
        SetParam(PARAM_KEYWORD, locations);
    };

    const GetLocationsFromUrl = () => {
        const locationsFromUrl = GetParam(PARAM_KEYWORD) || [];
        const locationIdsFromUrl = locationsFromUrl.reduce((res, location) => {
            const id = location.split('__')[0];
            return [...res, id];
        }, []);
        return locationIdsFromUrl;
    };

    const AddComment = (locationId, comment) => {
        const locationsFromUrl = GetParam(PARAM_KEYWORD) || [];
        const newLocations = locationsFromUrl.reduce((res, location) => {
            if (location.startsWith(locationId)) {
                return [...res, `${locationId}__${comment}`];
            }
            return [...res, location];
        }, []);
        SetParam(PARAM_KEYWORD, newLocations);
    };

    return { AddLocation, ResetUrl, DeleteLocation, GetLocationsFromUrl, AddComment };
};
