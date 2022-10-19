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
          id={INPUT_IDS.showFooter}
          checked={localSettings.showFooter}
          onChange={handleSetSettings}
          value={SETTING_VALUE.footer}
          size="small"
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.showFooter}>
          {t('Settings.ShowFooter')}
        </label>
      </div>
    </>
  );
};

export default DisplayBlock;
