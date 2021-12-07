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
    try {
      // @ts-ignore
      let res: T | null = JSON.parse(decoded);
      if (typeof res === 'string') {
        res = JSON.parse(res);
      }
      return res;
    } catch (e) {
      // @ts-ignore
      return decoded;
    }
  };

  const DeleteParam = (paramName: string) => {
    const usp: URLSearchParams = new URLSearchParams(
      location.search.replace('?', '')
    );
    usp.delete(paramName);
    const newUrl = usp.toString();
    history.push(`?${newUrl}`);
  };

  const SetParam = <T>(paramName: string, paramValue: T) => {
    const usp = new URLSearchParams(location.search.replace('?', ''));
    if (typeof paramValue !== 'string') {
      usp.set(paramName, encode(JSON.stringify(paramValue)));
    } else {
      usp.set(paramName, encode(paramValue));
    }
    const newUrl = usp.toString();
    history.push(`?${newUrl}`);
  };

  return { SetParam, GetParam, DeleteParam };
};
export { useQueryParams };
