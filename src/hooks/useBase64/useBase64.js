export const useBase64 = () => {
    const encode = str => {
        if (!str) {
            return '';
        }
        return Buffer.from(str).toString('base64');
    };

    const decode = str => {
        if (!str) {
            return str;
        }
        return atob(str);
    };

    return { encode, decode };
};
