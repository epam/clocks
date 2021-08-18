import { useLocation, useHistory } from 'react-router-dom';

export const useUrlParams = () => {
    const history = useHistory();
    console.log('🚀 ~ file: useUrlParams.js ~ line 5 ~ useUrlParams ~ history', history);
    const location = useLocation();

    const SetParam = (paramName, value) => {
        const params = new URLSearchParams(location.search);
        params.set(paramName, value);
        history.push(`${location.pathname}?${params.toString()}`);
    };

    const GetParam = param => {
        const params = new URLSearchParams(location.search);
        return JSON.parse(params.get(param));
    };

    return { GetParam, SetParam };
};
