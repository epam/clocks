const arrayIncludesCity = (name, array) => {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i].city === name) return true;
    }
    return false;
};

export default arrayIncludesCity;