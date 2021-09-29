import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CURRENT_USER_LOCATION_ID, PARAM_KEYWORD } from '../../constants';
import { getCurrentUserLocation, generateIdFormat, convertData } from '../../handlers';
import convertFromUrlLocations from '../../handlers/convertFromUrlLocations';
import { CheckForCityExistence } from '../../helpers/checkCityExistence';
import { useLocalStorage } from '../../hooks/useLocalStorage/useLocalStorage';
import { useQueryParams } from '../../hooks/useQueryParams/useQueryParams';
import { useUrl } from '../../hooks/useUrl/useUrl';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);
    const { getItem, setItem } = useLocalStorage();

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

    const ChangeUserCurrentLocation = locationId => {
        if (!locationId) {
            console.error('Location id for setting user current location is not valid');
        }
        setItem(CURRENT_USER_LOCATION_ID, locationId);
        const convertedLocations = convertData(locations, locationId);
        setLocations(convertedLocations);
    };

    useEffect(() => {
        let locations = GetParam(PARAM_KEYWORD) || [];
        const locationId = getCurrentUserLocation();
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
        const currentUserLocationId = getCurrentUserLocation();
        locationsFromUlrParams = convertFromUrlLocations(locationsFromUlrParams, currentUserLocationId);
        debugger;
        const convertedLocations = convertData(locationsFromUlrParams, currentUserLocationId);
        setLocations(convertedLocations);
    }, [location.search]);

    return {
        state: { hasCreateForm, locations },
        actions: {
            CreateFormHandler,
            ChangeUserCurrentLocation,
            AddLocation,
            DeleteLocation,
            ResetUrl,
            GetLocationsFromUrl,
            AddComment
        }
    };
};
