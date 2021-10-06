const generateIdFormat = (cityAscii, iso2, lat, lng) => {
    if (!(cityAscii && iso2 && lat && lng)) {
        debugger;
        console.error('Fields for generating id are not valid!');
    }
    return `${cityAscii}_${iso2}_${parseInt(Math.abs(lat), 10)}_${parseInt(Math.abs(lng), 10)}`;
};

export default generateIdFormat;
