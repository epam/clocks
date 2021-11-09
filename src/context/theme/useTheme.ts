import { createTheme } from '@material-ui/core';
import { useState } from 'react';
import { EpamColors } from '../../constants';

export const useTheme = () => {
    const [type, setType] = useState<'light' | 'dark'>('light');

    const theme = createTheme({
        palette: {
            type,
            background: { paper: type === 'dark' ? EpamColors.black : '#fff' }
        }
    });

    const ThemeHandler = () => {
        setType(type => {
            if (type === 'light') {
                return 'dark';
            }
            return 'light';
        });
    };

    return {
        state: {
            theme,
            type
        },
        actions: {
            ThemeHandler
        }
    };
};
