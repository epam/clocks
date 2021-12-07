export const useLocalStorage = () => {
  const getItem = (itemName: string) => {
    return localStorage.getItem(itemName);
  };

  const setItem = (itemName: string, value: any) => {
    localStorage.setItem(itemName, value);
  };

  const removeItem = (itemName: string) => {
    localStorage.removeItem(itemName);
  };

  const clear = () => {
    localStorage.clear();
  };
  return { clear, getItem, setItem, removeItem };
};
