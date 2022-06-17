import React, { useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { Divider, IconButton } from '@mui/material';
import { Instagram, Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';

import useTheme from '../../hooks/useTheme';

import style from './Footer.module.scss';
import { VERSION } from './Footer.constants';
import HelpModule from './components/HelpModule/HelpModule';

import { useWindowWidth } from '@react-hook/window-size';
import { THEME } from '../../redux/constants';
import { useSelector } from 'react-redux';
import { IInitialState } from '../../redux/types';

const Footer: React.FC = () => {
  const { theme } = useSelector((state: IInitialState) => state.settings);
  const { t } = useTranslation();
  const screenWidth = useWindowWidth();

  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const social = useMemo(
    () => [
      {
        url: 'https://github.com/epam/clocks',
        icon: GitHub
      },
      {
        url: 'https://www.linkedin.com/company/epam-systems/',
        icon: LinkedIn
      },
      {
        url: 'https://twitter.com/EPAMSYSTEMS',
        icon: Twitter
      },
      {
        url: 'https://www.facebook.com/EPAM.Global',
        icon: Facebook
      },
      {
        url: 'https://www.instagram.com/epamsystems/',
        icon: Instagram
      }
    ],
    []
  );

  return (
    <div className={style.container}>
      <div className={bodyTheme}>
        <div className={style.credits}>
          <Trans
            t={t}
            i18nKey="Footer.Credits"
            values={{ date: new Date().getFullYear() }}
            components={{ br: <br /> }}
          />
          <div>{VERSION}</div>
        </div>
        <div className={style.iconContainer}>
          <div className={iconTheme} tabIndex={0}>
            <HelpModule />
          </div>

          {screenWidth < 600 ? (
            <Divider
              sx={theme === THEME.dark ? { borderColor: 'white' } : { borderColor: 'lightgray' }}
              flexItem
            />
          ) : (
            <Divider
              sx={theme === THEME.dark ? { borderColor: 'white' } : { borderColor: 'lightgray' }}
              orientation="vertical"
              flexItem
            />
          )}

          <div>
            {social.map((item, index) => (
              <a
                key={index + 'SOCIAL'}
                href={item.url}
                data-testid="GitHubIconLink"
                target="_blank"
                rel="noreferrer"
              >
                <IconButton tabIndex={-1}>
                  <item.icon className={iconTheme} />
                </IconButton>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
