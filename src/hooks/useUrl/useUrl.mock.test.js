import { renderHook } from '@testing-library/react-hooks';
import { PARAM_KEYWORD } from '../../constants';
import { getCurrentUserLocation } from '../../handlers';
import { useUrl } from './useUrl';

const MockSetParam = jest.fn();
const MockGetParam = jest.fn();

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        pathname: '/',
        search: '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D',
        hash: ''
    }),
    useHistory: () => ({
        push: jest.fn()
    })
}));

jest.mock('../useQueryParams', () => {
    const originalModule = jest.requireActual('../useQueryParams');
    return {
        __esModule: true,
        ...originalModule,
        useQueryParams: () => ({ SetParam: MockSetParam, GetParam: MockGetParam })
    };
});

describe('test cases for useUrl hook', () => {
    it('add location to url params', () => {
        const {
            result: { current }
        } = renderHook(useUrl);
        current.AddLocation('Andijon_UZ_40_72');
        expect(MockGetParam).toHaveBeenCalledTimes(1);
        expect(MockSetParam).toHaveBeenCalledTimes(1);
    });
    it('delete location from url params', () => {
        const {
            result: { current }
        } = renderHook(useUrl);
        current.DeleteLocation('Tashkent_UZ_41_69');
        expect(MockGetParam).toHaveBeenCalledTimes(1);
        expect(MockSetParam).toHaveBeenCalledTimes(1);
    });
    it('delete location from url params error case', () => {
        const {
            result: { current }
        } = renderHook(useUrl);
        current.DeleteLocation();
        expect(MockGetParam).toHaveBeenCalledTimes(0);
        expect(MockSetParam).toHaveBeenCalledTimes(0);
    });
    it('reset url for current user', async () => {
        const {
            result: { current }
        } = renderHook(useUrl);
        await current.ResetUrl();
        const locationId = await getCurrentUserLocation();
        expect(MockSetParam).toHaveBeenCalledTimes(1);
        expect(MockSetParam).toBeCalledWith(PARAM_KEYWORD, [locationId]);
    });
    it('return location ids from url params', () => {
        const {
            result: { current }
        } = renderHook(useUrl);
        current.GetLocationsFromUrl();
        expect(MockGetParam).toHaveBeenCalledTimes(1);
        expect(MockGetParam).toHaveBeenCalledWith(PARAM_KEYWORD);
    });
});
