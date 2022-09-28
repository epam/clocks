import React from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_IDS } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';
import { COUNTRYFLAG } from '../../../../../../redux/constants';
import { RadioGroup } from '@mui/material';
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
  return (
    <>
      <RadioGroup value={localSettings.showTimezone} onChange={handleSetSettings}>
        {radio}
      </RadioGroup>
    </>
  );
};

export default CountryFlagBlock;
