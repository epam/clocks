import { useState, useEffect } from 'react';

const useDebounce = (text: string) => {
  const [debounceText, setDebounceText] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceText(text);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [text]);

  return debounceText;
};

export default useDebounce;
