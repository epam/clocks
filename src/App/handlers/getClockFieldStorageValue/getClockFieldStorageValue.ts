const getClockFieldStorageValue = (key: string) => {
  const storageValue = localStorage.getItem(key);
  if (!storageValue && storageValue !== 'false') {
    return true;
  }
  return JSON.parse(storageValue);
};

export default getClockFieldStorageValue;
