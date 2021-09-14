import { useHistory, useLocation } from 'react-router-dom';
import { useBase64 } from '../useBase64/useBase64';

const useQueryParams = () => {
    const history = useHistory();
    const location = useLocation();
    const { encode, decode } = useBase64();

    const GetParam = paramName => {
        const usp = new URLSearchParams(location.search.replace('?', ''));
        let paramValue = usp.get(paramName);
        const decoded = decode(paramValue);
        paramValue = JSON.parse(decoded);
        if (typeof paramValue === 'string') {
            paramValue = JSON.parse(paramValue);
        }
        return paramValue;
    };

    const SetParam = (paramName, paramValue) => {
        const usp = new URLSearchParams(location.search.replace('?', ''));
        usp.set(paramName, encode(JSON.stringify(paramValue)));
        const url = usp.toString();
        history.push(`?${url}`);
    };

    return { SetParam, GetParam };
};
export { useQueryParams };
