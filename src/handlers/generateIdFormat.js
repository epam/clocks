const generateIdFormat = (cityAscii, iso2, lat, lng) => {
    if (!(cityAscii && iso2 && lat && lng)) {
        return '';
    }
    if (
        typeof cityAscii !== 'string' ||
        typeof iso2 !== 'string' ||
        Number.isNaN(parseInt(lat, 10)) ||
        Number.isNaN(parseInt(lng, 10))
    ) {
        return '';
    }
    return `${cityAscii}_${iso2}_${parseInt(Math.abs(lat), 10)}_${parseInt(Math.abs(lng), 10)}`;
};

export default generateIdFormat;
