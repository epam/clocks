import { useHistory, useLocation } from 'react-router-dom';
import { useBase64 } from '../useBase64';

const useQueryParams = () => {
    const history = useHistory();
    const location = useLocation();
    const { encode, decode } = useBase64();

    const GetParam = <T>(paramName: string): T | null => {
        const usp = new URLSearchParams(location.search.replace('?', ''));
        const paramValue = usp.get(paramName);
        const decoded = decode(paramValue);
        // @ts-ignore
        let res: T | null = JSON.parse(decoded);
        if (typeof res === 'string') {
            res = JSON.parse(res);
        }
        return res;
    };

    const SetParam = <T>(paramName: string, paramValue: T) => {
        const usp = new URLSearchParams(location.search.replace('?', ''));
        usp.set(paramName, encode(JSON.stringify(paramValue)));
        const url = usp.toString();
        history.push(`?${url}`);
    };

    return { SetParam, GetParam };
};
export { useQueryParams };
