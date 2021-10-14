/* eslint-disable no-param-reassign */

function getObjectProperty(obj = {}, arr = []) {
    // object is undefined or empty return undefined
    if (!obj || Object.keys(obj).length === 0) return undefined;
    if (arr === undefined || arr === null) return undefined;
    // check array
    if (!Array.isArray(arr)) {
        const arrayType = typeof arr;
        if (arrayType === 'string' || arrayType === 'number') {
            arr = [arr];
        }
    }
    const { length } = arr;
    let index = 0;
    while (obj && index < length) {
        // eslint-disable-next-line no-plusplus
        obj = obj[arr[index++]];
    }
    return index === length ? obj : undefined;
}

export default getObjectProperty;
