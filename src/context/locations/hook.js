import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PARAM_KEYWORD } from '../../constants';
import { getCurrentUserLocation, generateIdFormat, convertData } from '../../handlers';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations';
import { CheckForCityExistence } from '../../helpers/checkCityExistence';
import { useQueryParams } from '../../hooks/useQueryParams/useQueryParams';
import { useUrl } from '../../hooks/useUrl/useUrl';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);

    const location = useLocation();

    const { SetParam, GetParam } = useQueryParams();
    const { AddComment, AddLocation, DeleteLocation, ResetUrl, GetLocationsFromUrl } = useUrl();

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            setHasCreateForm(hasForm);
        } else {
            setHasCreateForm(prevState => !prevState);
        }
    };

    useEffect(() => {
        let locations = GetParam(PARAM_KEYWORD) || [];
        const { city_ascii: cityAscii, iso2, lat, lng } = getCurrentUserLocation();
        const locationId = generateIdFormat(cityAscii, iso2, lat, lng);
        if (!locations || !locations.length) {
            locations = [locationId];
            return SetParam(PARAM_KEYWORD, locations);
        }
        if (!Array.isArray(locations)) {
            return console.error('Locations are not valid');
        }
        const currentUserExists = CheckForCityExistence(locations, locationId);
        if (!currentUserExists) {
            AddLocation(locationId);
        }
    }, []);

    useEffect(() => {
        let locationsFromUlrParams = GetParam(PARAM_KEYWORD) || [];
        if (!Array.isArray(locationsFromUlrParams)) {
            return console.error('Locations from url must be array');
        }
        locationsFromUlrParams = convertFromUrlLocations(locationsFromUlrParams);
        const convertedLocations = convertData(locationsFromUlrParams);
        setLocations(convertedLocations);
        // setLocations([]);
    }, [location.search]);

    return {
        state: { hasCreateForm, locations },
        actions: { CreateFormHandler, AddLocation, DeleteLocation, ResetUrl, GetLocationsFromUrl, AddComment }
    };
};
