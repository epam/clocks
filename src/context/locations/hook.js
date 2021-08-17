import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { convertArray } from '../../handlers';
import { useUrlParams } from '../../hooks/useUrlParams/useUrlParams';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    console.log('🚀 ~ file: hook.js ~ line 8 ~ useLocations ~ locations', locations);
    const [hasCreateForm, setHasCreateForm] = useState(false);

    const location = useLocation();

    const { AddParam, GetParam } = useUrlParams();

    const GetLocationsFromParams = () => {
        return GetParam('locations');
    };

    const ConvertLocationsArrayToUrlFormat = (locationsArray = []) => {
        return locationsArray.reduce((arr, { city, country, timezone, message }) => {
            return [
                ...arr,
                {
                    city,
                    country,
                    timezone,
                    message
                }
            ];
        }, []);
    };

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            return setHasCreateForm(hasForm);
        }
        setHasCreateForm(!hasCreateForm);
    };

    useEffect(() => {
        const locations = GetLocationsFromParams();
        if (!locations || !locations.length) {
            const locatoinsWithCurrentUserLocation = convertArray([]);
            const formattedLocations = ConvertLocationsArrayToUrlFormat(locatoinsWithCurrentUserLocation);
            AddParam('locations', JSON.stringify(formattedLocations));
            setLocations(locatoinsWithCurrentUserLocation);
        }
    }, []);

    useEffect(() => {
        const locationsFromUlrParams = GetLocationsFromParams();
        const convertedLocations = convertArray(locationsFromUlrParams);
        setLocations(convertedLocations);
    }, [location.search]);

    const AddLocation = location => {
        const locations = GetLocationsFromParams();
        locations.push(location);
    };

    const DeleteLocation = location => {
        console.log(location);
    };

    return {
        state: { hasCreateForm, locations },
        actions: { CreateFormHandler, AddLocation, DeleteLocation }
    };
};
