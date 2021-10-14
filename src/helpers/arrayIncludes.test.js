import arrayIncludes from './arrayIncludes';

const data = [
    {
        name: 'John',
        age: 19
    },
    {
        name: 'Sarah',
        age: 25
    },
    {
        name: 'Nick',
        age: 55,
        grades: {
            math: 'C'
        }
    }
];

describe('Array Includes function', () => {
    it('return false if some of the arguments are not given', () => {
        expect(arrayIncludes()).toBe(false);
        expect(arrayIncludes()).not.toBe(true);
        expect(arrayIncludes('')).toBe(false);
        expect(arrayIncludes('John', data, '')).toBe(false);
    });
    it('returns false if not found', () => {
        expect(arrayIncludes('Mike', data, 'name')).toBe(false);
        expect(arrayIncludes('Mike', data, '')).toBe(false);
        expect(arrayIncludes('D', data, ['grades', 'math'])).toBe(false);
    });
    it('returns true if value found', () => {
        expect(arrayIncludes('Nick', data, 'name')).toBe(true);
        expect(arrayIncludes('C', data, ['grades', 'math'])).toBe(true);
    });
});
