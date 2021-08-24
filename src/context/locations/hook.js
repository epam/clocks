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
            setHasCreateForm(hasForm);
        } else {
            setHasCreateForm(prevState => !prevState);
        }
    };

    const CheckForCityExistance = (locations, { city, country, timezone }) => {
        return !!locations.find(location => {
            return location.city === city && location.country === country && location.timezone === timezone;
        });
    };

    const AddLocation = ({ city, country, message = '', timezone }) => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const isCityAlreadyAdded = CheckForCityExistance(locationsFromUrl, { city, country, timezone });
        if (isCityAlreadyAdded) {
            return alert('This city has already been added!');
        }
        locationsFromUrl.push({
            city,
            country,
            message,
            timezone
        });
        SetParam(paramKeyWord, locationsFromUrl);
    };

    const ResetUrl = () => {
        const { city, country, timezone } = getCurrentUserLocation();
        const locations = [{ city, country, timezone, message: '' }];
        SetParam(paramKeyWord, locations);
    };

    const DeleteLocation = ({ city, country, timezone }) => {
        const locationsFromUrl = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUrl)) {
            return console.error('Unexpected type!');
        }
        const filteredLocations = locationsFromUrl.filter(
            location => !(location.city === city && location.country === country && location.timezone === timezone)
        );
        SetParam(paramKeyWord, filteredLocations);
    };

    useEffect(() => {
        const locations = GetParam(paramKeyWord) || [];
        const { city, country, timezone } = getCurrentUserLocation();
        if (!locations || !locations.length) {
            const locations = [{ city, country, timezone, message: '' }];
            return SetParam(paramKeyWord, locations);
        }
        if (!Array.isArray(locations)) {
            return console.error('Locations are not valid');
        }
        const currentUserExists = CheckForCityExistance(locations, { city, country, timezone });
        if (!currentUserExists) {
            AddLocation({ city, country, timezone });
        }
    }, []);

    useEffect(() => {
        const locationsFromUlrParams = GetParam(paramKeyWord) || [];
        if (!Array.isArray(locationsFromUlrParams)) {
            return console.error('Locations from url must be array');
        }
        const convertedLocations = convertArray(locationsFromUlrParams);
        setLocations(convertedLocations);
    }, [location.search]);

    return {
        state: { hasCreateForm, locations },
        actions: { CreateFormHandler, AddLocation, DeleteLocation, ResetUrl }
    };
};
