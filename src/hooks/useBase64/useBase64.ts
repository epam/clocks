export const useBase64 = () => {
  const encode = (str: string): string => {
    if (!str) {
      return '';
    }
    return Buffer.from(str).toString('base64');
  };

  const decode = (str: string | null): string | null => {
    if (!str) {
      return str;
    }
    return atob(str);
  };

  return { encode, decode };
};
