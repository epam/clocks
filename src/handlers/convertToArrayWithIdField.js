import generateIdFormat from './generateIdFormat';

const convertToArrayWithIdField = list => {
    if (!Array.isArray(list)) {
        /* eslint-disable */
        return console.error('List is not type of array!');
    }
    list.forEach(item => {
        /* eslint-disable */
        item.id = generateIdFormat(item.city_ascii, item.iso2, item.lat, item.lng);
    }, []);
    return list;
};

export default convertToArrayWithIdField;
