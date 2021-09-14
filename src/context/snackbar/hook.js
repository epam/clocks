import { useState } from 'react';

export const useSnackbar = () => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const SnackbarHandler = isOpen => {
        if (typeof isOpen === 'boolean') {
            return setIsSnackbarOpen(isOpen);
        }
        setIsSnackbarOpen(prev => !prev);
    };

    const OpenSnackbar = message => {
        if (typeof message !== 'string') {
            console.error('Type of message is not string');
        }
        setMessage(message);
        setIsSnackbarOpen(true);
    };

    return {
        isSnackbarOpen,
        message,
        SnackbarHandler,
        OpenSnackbar
    };
};
