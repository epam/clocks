import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox } from '@mui/material';

import style from '../../SettingsModal.module.scss';
import { INPUT_IDS, SETTING_VALUE } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';

const DisplayBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Checkbox
          id={INPUT_IDS.showDate}
          checked={localSettings.showDate}
          onChange={handleSetSettings}
          value={SETTING_VALUE.date}
          size="small"
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.showDate}>
          {t('Settings.ShowDate')}
        </label>
      </div>
      <div>
        <Checkbox
          id={INPUT_IDS.showTimezone}
          checked={localSettings.showTimezone}
          onChange={handleSetSettings}
          value={SETTING_VALUE.timezone}
          size="small"
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.showTimezone}>
          {t('Settings.ShowTimezone')}
        </label>
      </div>
      <div>
        <Checkbox
          id={INPUT_IDS.displayCountry}
          checked={localSettings.showCountry}
          onChange={handleSetSettings}
          value={SETTING_VALUE.country}
          size="small"
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.displayCountry}>
          {t('Settings.DisplayCountry')}
        </label>
      </div>
      <div>
        <Checkbox
          id={INPUT_IDS.displayFlag}
          checked={localSettings.showFlag}
          onChange={handleSetSettings}
          value={SETTING_VALUE.flag}
          size="small"
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.displayFlag}>
          {t('Settings.DisplayFlag')}
        </label>
      </div>
    </>
  );
};

export default DisplayBlock;
