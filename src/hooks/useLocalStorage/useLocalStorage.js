export const useLocalStorage = () => {
    const getItem = itemName => {
        localStorage.getItem(itemName);
    };

    const setItem = (itemName, value) => {
        localStorage.setItem(itemName, value);
    };

    const removeItem = itemName => {
        localStorage.removeItem(itemName);
    };

    const clear = () => {
        localStorage.clear();
    };
    return { clear, getItem, setItem, removeItem };
};
