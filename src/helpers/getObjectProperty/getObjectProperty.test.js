import getObjectProperty from './getObjectProperty';

const data = {
    student: {
        name: 'John',
        age: 23,
        grades: {
            math: 'C',
            physics: 'A+'
        }
    }
};

const array = ['hello', ['world', ['testing is', ['amazing']]]];

describe('get object property function', () => {
    it('returns undefined if wrong arguments given', () => {
        expect(getObjectProperty()).toBe(undefined);
        expect(getObjectProperty()).toBeFalsy();
        expect(getObjectProperty({}, [])).toBe(undefined);
        expect(getObjectProperty([], {})).toBe(undefined);
    });
    it('returns value if correct arguments given', () => {
        expect(getObjectProperty(data, ['student', 'name'])).not.toBe(undefined);
        expect(getObjectProperty(data, ['student', 'grades', 'math'])).toBe('C');
        expect(getObjectProperty(data, 'student')).toEqual(expect.objectContaining({ name: 'John', age: 23 }));
    });
    it('should be available work with arrays', () => {
        expect(getObjectProperty(array, [1, 0])).not.toBe(undefined);
        expect(getObjectProperty(array, [1, 0])).toBe('world');
        expect(getObjectProperty(array, 0)).toBe('hello');
        expect(getObjectProperty(array, [1, 1])).toEqual(expect.arrayContaining(['testing is']));
    });
});
