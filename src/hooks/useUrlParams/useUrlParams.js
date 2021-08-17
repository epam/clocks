import { useHistory, useLocation } from 'react-router-dom';

export const useUrlParams = () => {
    const history = useHistory();
    const location = useLocation();

    const AddParam = (paramName, value) => {
        const params = location.search;
        if (!params) {
            return history.push(`${location.pathname}?${paramName}=${value}`);
        }
        history.push(`${location.pathname}${location.search}&${paramName}=${value}`);
    };

    const GetParam = param => {
        const params = new URLSearchParams(location.search);
        return JSON.parse(params.get(param)) || [];
    };

    return { GetParam, AddParam };
};
