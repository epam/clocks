import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { Checkbox, RadioGroup, Radio } from '@mui/material';

import style from '../../SettingsModal.module.scss';
import { INPUT_IDS, SETTING_VALUE } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';
import { THEME } from '../../../../../../redux/constants';

const ThemeBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Checkbox
          id={INPUT_IDS.autoTheming}
          checked={localSettings.autoTheme}
          onChange={handleSetSettings}
          value={SETTING_VALUE.auto}
          size="small"
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.autoTheming}>
          {t('Settings.AutoTheme')}
        </label>
      </div>
      <RadioGroup value={localSettings.theme} onChange={handleSetSettings}>
        <div>
          <Radio
            id={INPUT_IDS.lightTheme}
            className={clsx({ [style.disabled]: localSettings.autoTheme })}
            value={THEME.light}
            disabled={localSettings.autoTheme}
            size="small"
          />
          <label
            htmlFor={INPUT_IDS.lightTheme}
            className={(clsx({ [style.disabled]: localSettings.autoTheme }), style.cursorPointer)}
          >
            {t('Settings.LightTheme')}
          </label>
        </div>
        <div>
          <Radio
            id={INPUT_IDS.darkTheme}
            className={clsx({ [style.disabled]: localSettings.autoTheme })}
            value={THEME.dark}
            disabled={localSettings.autoTheme}
            size="small"
          />
          <label
            htmlFor={INPUT_IDS.darkTheme}
            className={(clsx({ [style.disabled]: localSettings.autoTheme }), style.cursorPointer)}
          >
            {t('Settings.DarkTheme')}
          </label>
        </div>
      </RadioGroup>
    </>
  );
};

export default ThemeBlock;
