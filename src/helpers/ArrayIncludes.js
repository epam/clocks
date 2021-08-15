const arrayIncludes = (name, prop, array) => {
    for (let i = 0; i < array.length; i += 1) {
        if (array[i][prop] === name) return true;
    }
    return false;
};

export default arrayIncludes;
