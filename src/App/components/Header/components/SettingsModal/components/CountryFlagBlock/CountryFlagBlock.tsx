import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RadioGroup, Checkbox } from '@mui/material';

import { INPUT_IDS, SETTING_VALUE } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';
import { COUNTRYFLAG } from '../../../../../../redux/constants';

import style from '../../SettingsModal.module.scss';
import { truncate } from '../../../../../../utils/truncate';
import RadioList from '../TimezoneBlock/components/RadioList/RadioList';

const CountryFlagBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();
  const radioGroupData = [
    {
      id: INPUT_IDS.hideCountryFlag,
      value: COUNTRYFLAG.hide,
      translate: t('Settings.HideCountryFlag')
    },
    {
      id: INPUT_IDS.displayFlag,
      value: COUNTRYFLAG.flag,
      translate: t('Settings.DisplayFlag')
    },
    {
      id: INPUT_IDS.displayCountry,
      value: COUNTRYFLAG.country,
      translate: t('Settings.DisplayCountry')
    },
    {
      id: INPUT_IDS.displayFlagAndCountry,
      value: COUNTRYFLAG.flagAndCountry,
      translate: t('Settings.DisplayFlagAndCountry')
    }
  ];
  const radio = radioGroupData.map(({ id, value, translate }) => (
    <RadioList key={id} id={id} value={value} translate={translate} />
  ));
  const [isTruncate, setIsTruncate] = useState(true);

  return (
    <>
      <RadioGroup value={localSettings.showFlagAndCountry} onChange={handleSetSettings}>
        {radio}
      </RadioGroup>
      <div onMouseEnter={() => setIsTruncate(false)} onMouseLeave={() => setIsTruncate(true)}>
        <Checkbox
          id={INPUT_IDS.displayFlagInSearch}
          checked={localSettings.displayFlagInSearch}
          onChange={handleSetSettings}
          value={SETTING_VALUE.searchFlag}
        />
        <label className={style.cursorPointer} htmlFor={INPUT_IDS.displayFlagInSearch}>
          {isTruncate
            ? truncate(t('Settings.DisplayFlagInSearch'), 24)
            : t('Settings.DisplayFlagInSearch')}
        </label>
      </div>
    </>
  );
};

export default CountryFlagBlock;
