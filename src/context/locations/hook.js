import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { convertArray } from '../../handlers';
import { useUrlParams } from '../../hooks/useUrlParams/useUrlParams';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);

    const location = useLocation();

    const { AddParam, GetParam } = useUrlParams();

    const GetLocationsFromParams = () => {
        return GetParam('locations');
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
            AddParam('locations', JSON.stringify(locatoinsWithCurrentUserLocation));
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
