import React, { useState, useEffect, useMemo, ChangeEvent, useCallback } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import {
  IconButton,
  Dialog,
  Button,
  Checkbox,
  RadioGroup,
  Radio,
  Divider,
  Tooltip
} from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

import useTheme from '../../../../hooks/useTheme';
import useAutoTheme from '../../../../hooks/useAutoTheme';
import { IInitialState, IActionSettingsPayload } from '../../../../redux/types';
import { THEME } from '../../../../redux/constants';
import { setSettings } from '../../../../redux/actions';

import style from './SettingsModal.module.scss';
import { SETTING_VALUE } from './SettingsModal.constants';

const SettingsModal: React.FC = () => {
  const buttonTheme = useTheme(style.lightIcon, style.darkIcon);
  const bodyTheme = useTheme(style.lightBody, style.darkBody);

  const { t } = useTranslation();

  const { setAutoTheme } = useAutoTheme();

  const [isModalOpen, setModal] = useState(false);

  const { autoTheme, theme, showDate, showCountry, deleteMode, counter } = useSelector(
    (state: IInitialState) => state
  );

  const dispatch = useDispatch();

  const [localSettings, setLocalSettings] = useState<IActionSettingsPayload>({
    autoTheme: undefined,
    theme: THEME.light,
    showDate: true,
    showCountry: true
  });

  useEffect(() => {
    setLocalSettings({
      autoTheme,
      theme,
      showDate,
      showCountry
    });
  }, [autoTheme, theme, showDate, showCountry, isModalOpen]);

  useEffect(() => {
    const localStorageSettings = localStorage.getItem('settings');

    if (localStorageSettings) {
      const parsedSettings = JSON.parse(localStorageSettings);
      dispatch(setSettings({ ...parsedSettings }));
    }
    // use it only when component mount
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (autoTheme) {
      setAutoTheme();
    }
    // don't need as a dependancy setAutoTheme
    // eslint-disable-next-line
  }, [autoTheme, counter]);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleSetSettings = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      switch (value) {
        case SETTING_VALUE.date:
          setLocalSettings({ ...localSettings, showDate: !localSettings.showDate });
          break;
        case SETTING_VALUE.country:
          setLocalSettings({ ...localSettings, showCountry: !localSettings.showCountry });
          break;
        case SETTING_VALUE.auto:
          setLocalSettings({ ...localSettings, autoTheme: !localSettings.autoTheme });
          break;
        default:
          setLocalSettings({ ...localSettings, theme: value });
          break;
      }
    },
    [localSettings]
  );

  const handleClose = () => {
    setModal(false);
  };

  const handleSave = () => {
    dispatch(setSettings({ ...localSettings }));
    localStorage.setItem('settings', JSON.stringify(localSettings));
    setModal(false);
  };

  const tooltipText = useMemo((): string => t('Settings.ButtonTooltip'), [t]);

  return (
    <>
      <Tooltip title={tooltipText} arrow>
        <IconButton onClick={handleOpenModal} disabled={deleteMode}>
          <SettingsOutlined
            className={clsx({ [buttonTheme]: true, [style.disabledIcon]: deleteMode })}
          />
        </IconButton>
      </Tooltip>

      <Dialog open={isModalOpen} onClose={handleClose}>
        <div className={bodyTheme}>
          <div className={style.modalTitle}>{t('Settings.ModalTitle')}</div>
          <div>
            <Checkbox
              checked={localSettings.showDate}
              onChange={handleSetSettings}
              value={SETTING_VALUE.date}
            />
            <span>{t('Settings.ShowDate')}</span>
          </div>
          <div>
            <Checkbox
              checked={localSettings.showCountry}
              onChange={handleSetSettings}
              value={SETTING_VALUE.country}
            />
            <span>{t('Settings.ShowCountry')}</span>
          </div>
          <Divider
            className={clsx({ [style.divider]: true, [style.darkDivider]: theme === THEME.dark })}
          />
          <div>
            <Checkbox
              checked={localSettings.autoTheme}
              onChange={handleSetSettings}
              value={SETTING_VALUE.auto}
            />
            <span>{t('Settings.AutoTheme')}</span>
          </div>
          <RadioGroup value={localSettings.theme} onChange={handleSetSettings}>
            <div>
              <Radio
                className={clsx({ [style.disabled]: localSettings.autoTheme })}
                value={THEME.light}
                disabled={localSettings.autoTheme}
              />
              <span className={clsx({ [style.disabled]: localSettings.autoTheme })}>
                {t('Settings.LightTheme')}
              </span>
            </div>
            <div>
              <Radio
                className={clsx({ [style.disabled]: localSettings.autoTheme })}
                value={THEME.dark}
                disabled={localSettings.autoTheme}
              />
              <span className={clsx({ [style.disabled]: localSettings.autoTheme })}>
                {t('Settings.DarkTheme')}
              </span>
            </div>
          </RadioGroup>
          <div className={style.buttonContainer}>
            <Button className={style.button} onClick={handleClose}>
              {t('Settings.CancelButton')}
            </Button>
            <Button className={style.button} onClick={handleSave}>
              {t('Settings.SaveButton')}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SettingsModal;