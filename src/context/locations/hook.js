import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentUserLocation, convertArray } from '../../handlers';
import { useQueryParams } from '../../hooks/useUrlParams/useQueryParams';

const paramKeyWord = 'locations';

export const useLocations = () => {
    const [locations, setLocations] = useState([]);
    const [hasCreateForm, setHasCreateForm] = useState(false);

    const location = useLocation();

    const { SetParam, GetParam } = useQueryParams();

    const CreateFormHandler = hasForm => {
        if (hasForm && typeof hasForm === 'boolean') {
            return setHasCreateForm(hasForm);
        }
        setHasCreateForm(prev => !prev);
    };

    useEffect(() => {
        const locations = GetParam(paramKeyWord) || [];
        if (!locations || !locations.length) {
            const { city, country, timezone } = getCurrentUserLocation();
            const locations = [{ city, country, timezone, message: '' }];
            return SetParam(paramKeyWord, JSON.stringify(locations));
        }
        if (!Array.isArray(locations)) {
            return console.error('Locations are not valid');
        }
        SetParam(paramKeyWord, JSON.stringify(convertArray(locations)));
    }, []);

    useEffect(() => {
        const locationsFromUlrParams = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUlrParams)) {
            return console.error('Locations form url must be array');
        }
        const convertedLocations = convertArray(locationsFromUlrParams);
        setLocations(convertedLocations);
    }, [location.search]);

    const AddLocation = ({ city, country, message = '', timezone }) => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        locationsFromUrl.push({
            city,
            country,
            message,
            timezone
        });
        SetParam(paramKeyWord, locationsFromUrl);
    };

    const DeleteLocation = () => {
        // delete logic here
    };

    return {
        state: { hasCreateForm, locations },
        actions: { CreateFormHandler, AddLocation, DeleteLocation }
    };
};
