import React, { useMemo } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { Divider, IconButton } from '@mui/material';
import { Instagram, Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';

import useTheme from '../../hooks/useTheme';

import HelpModule from './components/HelpModule/HelpModule';
import ReloadOnboarding from './components/ReloadOnboarding/ReloadOnboarding';
import style from './Footer.module.scss';
import { VERSION } from './Footer.constants';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);
  const dividerTheme = useTheme(style.divider, style.darkDivider);

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
          <div
            style={{
              display: 'flex',
              flexDirection: window.innerWidth < 600 ? 'column' : 'row',
              alignItems: 'center'
            }}
          >
            <div>
              <HelpModule />
              <ReloadOnboarding />
            </div>
            <Divider
              orientation={window.innerWidth < 600 ? 'horizontal' : 'vertical'}
              className={dividerTheme}
              flexItem
            />

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
    </div>
  );
};

export default Footer;
