/* eslint-disable no-param-reassign */
function getObjectProperty(obj: any, arr: any = []): any {
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
        obj = obj[arr[(index += 1)]];
    }
    return index === length ? obj : undefined;
}

export default getObjectProperty;
