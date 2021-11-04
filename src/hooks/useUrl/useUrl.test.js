import { renderHook } from '@testing-library/react-hooks';
import { useUrl } from './useUrl';

const MockFunction = jest.fn();

jest.mock('react-router-dom', () => {
    return {
        useLocation: () => ({
            pathname: '/',
            search: '?locations=WyJUYXNoa2VudF9VWl80MV82OSIsIk5hbWFuZ2FuX1VaXzQxXzcxIl0%3D',
            hash: ''
        }),
        useHistory: () => ({
            push: MockFunction
        })
    };
});

describe('testing useUrl hook without mocks', () => {
    it('add comment to url params', () => {
        const expectedURI =
            '?locations=WyJUYXNoa2VudF9VWl80MV82OV9fdGhpcyBpcyB0ZXN0IGNvbW1lbnQiLCJOYW1hbmdhbl9VWl80MV83MSJd';
        const {
            result: { current }
        } = renderHook(useUrl);
        current.AddComment('Tashkent_UZ_41_69', 'this is test comment');
        expect(MockFunction).toHaveBeenCalledTimes(1);
        expect(MockFunction).toHaveBeenCalledWith(expectedURI);
    });
});
