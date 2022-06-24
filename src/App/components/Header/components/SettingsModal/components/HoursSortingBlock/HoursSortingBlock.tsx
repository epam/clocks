import React from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, RadioGroup, Radio } from '@mui/material';

import style from '../../SettingsModal.module.scss';
import { INPUT_IDS, SETTING_VALUE } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';
import { TIME_FORMAT } from '../../../../../../redux/constants';

const HoursSortingBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();

  return (
    <>
      <RadioGroup value={localSettings.timeFormat} onChange={handleSetSettings}>
        <div>
          <Radio id={INPUT_IDS.hourFormat24} value={TIME_FORMAT.H24} />
          <label className={style.cursorPointer} htmlFor={INPUT_IDS.hourFormat24}>
            {t('Settings.24HourFormat')}
          </label>
        </div>
        <div>
          <Radio id={INPUT_IDS.hourFormat12} value={TIME_FORMAT.H12} />
          <label className={style.cursorPointer} htmlFor={INPUT_IDS.hourFormat12}>
            {t('Settings.12HourFormat')}
          </label>
        </div>
      </RadioGroup>
      <div className={style.autoSorting}>
        <Checkbox
          id={INPUT_IDS.autoSorting}
          checked={localSettings.autoSorting}
          onChange={handleSetSettings}
          value={SETTING_VALUE.autoSorting}
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.autoSorting}>
          {t('Settings.AutoSortWidget')}
        </label>
      </div>
    </>
  );
};

export default HoursSortingBlock;
