import React from 'react';
import { useTranslation } from 'react-i18next';

import { RadioGroup, Radio } from '@mui/material';

import style from '../../SettingsModal.module.scss';
import { INPUT_IDS } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';
import { TIMEZONE } from '../../../../../../redux/constants';

const TimezoneBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();

  return (
    <>
      <RadioGroup value={localSettings.showTimezone} onChange={handleSetSettings}>
        <div>
          <Radio id={INPUT_IDS.disableTimezone} value={TIMEZONE.disabled} />
          <label className={style.cursorPointer} htmlFor={INPUT_IDS.disableTimezone}>
            {t('Settings.DisableTimezone')}
          </label>
        </div>
        <div>
          <Radio id={INPUT_IDS.abbreviationTimezone} value={TIMEZONE.abbrv} />
          <label className={style.cursorPointer} htmlFor={INPUT_IDS.abbreviationTimezone}>
            {t('Settings.AbbrvTimezone')}
          </label>
        </div>
        <div>
          <Radio id={INPUT_IDS.countryTimezone} value={TIMEZONE.country} />
          <label className={style.cursorPointer} htmlFor={INPUT_IDS.countryTimezone}>
            {t('Settings.CountryTimezone')}
          </label>
        </div>
        <div>
          <Radio id={INPUT_IDS.abbreviationAndCountryTimezone} value={TIMEZONE.abbrvCountry} />
          <label className={style.cursorPointer} htmlFor={INPUT_IDS.abbreviationAndCountryTimezone}>
            {t('Settings.AbbrvAndCountryTimezone')}
          </label>
        </div>
      </RadioGroup>
    </>
  );
};

export default TimezoneBlock;
