import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUserLocation, generateIdFormat, convertData } from '../../handlers';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations';
import { useQueryParams } from '../../hooks/useQueryParams/useQueryParams';

const paramKeyWord = 'locations';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);

    const location = useLocation();

    const { SetParam, GetParam } = useQueryParams();

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            setHasCreateForm(hasForm);
        } else {
            setHasCreateForm(prevState => !prevState);
        }
    };

    const CheckForCityExistance = (locations, locationId) => {
        return !!locations.find(location => location.startsWith(locationId));
    };

    const AddLocation = ({ cityAscii, iso2, lat, lng, message = '' }) => {
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const isCityAlreadyAdded = CheckForCityExistance(locationsFromUrl, locationId);
        if (isCityAlreadyAdded) {
            return alert('This city has already been added!');
        }
        locationsFromUrl.push(`${locationId}${message && `__${message}`}`);
        SetParam(paramKeyWord, locationsFromUrl);
    };

    const ResetUrl = () => {
        const { city_ascii: cityAscii, iso2, lat, lng } = getCurrentUserLocation();
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        const locations = [locationId];
        SetParam(paramKeyWord, locations);
    };

    const DeleteLocation = locationId => {
        if (!locationId) {
            return console.error('Id for deleting location is not valid!');
        }
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const filteredLocations = locationsFromUrl.filter(location => !location.startsWith(locationId));
        SetParam(paramKeyWord, filteredLocations);
    };

    const GetLocationsFromUrl = () => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        const locationIdsFromUrl = locationsFromUrl.reduce((res, location) => {
            const id = location.split('__')[0];
            return [...res, id];
        }, []);
        return locationIdsFromUrl;
    };

    const AddComment = (locationId, comment) => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        const newLocations = locationsFromUrl.reduce((res, location) => {
            if (location.startsWith(locationId)) {
                return [...res, `${locationId}__${comment}`];
            }
            return [...res, location];
        }, []);
        SetParam(paramKeyWord, newLocations);
    };

    useEffect(() => {
        let locations = GetParam(paramKeyWord) || [];
        const { city_ascii: cityAscii, iso2, lat, lng } = getCurrentUserLocation();
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        if (!locations || !locations.length) {
            locations = [locationId];
            return SetParam(paramKeyWord, locations);
        }
        if (!Array.isArray(locations)) {
            return console.error('Locations are not valid');
        }
        const currentUserExists = CheckForCityExistance(locations, locationId);
        if (!currentUserExists) {
            AddLocation(locationId);
        }
    }, []);

    useEffect(() => {
        let locationsFromUlrParams = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUlrParams)) {
            return console.error('Locations from url must be array');
        }
        locationsFromUlrParams = convertFromUrlLocations(locationsFromUlrParams);
        const convertedLocations = convertData(locationsFromUlrParams);
        setLocations(convertedLocations);
    }, [location.search]);

    return {
        state: { hasCreateForm, locations },
        actions: { CreateFormHandler, AddLocation, DeleteLocation, ResetUrl, GetLocationsFromUrl, AddComment }
    };
};
