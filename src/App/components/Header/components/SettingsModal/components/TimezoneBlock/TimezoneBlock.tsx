import React from 'react';
import { useTranslation } from 'react-i18next';

import { INPUT_IDS } from '../../SettingsModal.constants';
import { IBlocksProps } from '../../SettingsModal.types';
import { TIMEZONE } from '../../../../../../redux/constants';
import { RadioGroup } from '@mui/material';
import RadioList from './components/RadioList/RadioList';

const TimezoneBlock: React.FC<IBlocksProps> = ({ localSettings, handleSetSettings }) => {
  const { t } = useTranslation();
  const radioGroupData = [
    {
      id: INPUT_IDS.disableTimezone,
      value: TIMEZONE.disabled,
      translate: t('Settings.DisableTimezone')
    },
    {
      id: INPUT_IDS.abbreviationTimezone,
      value: TIMEZONE.abbrv,
      translate: t('Settings.AbbrvTimezone')
    },
    {
      id: INPUT_IDS.countryTimezone,
      value: TIMEZONE.country,
      translate: t('Settings.CountryTimezone')
    },
    {
      id: INPUT_IDS.abbreviationAndCountryTimezone,
      value: TIMEZONE.abbrvCountry,
      translate: t('Settings.AbbrvAndCountryTimezone')
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

export default TimezoneBlock;
