import React, { useMemo } from 'react';

import { Divider, IconButton } from '@mui/material';
import { Instagram, Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';

import useTheme from '../../hooks/useTheme';

import HelpModule from './components/HelpModule/HelpModule';
import ReloadOnboarding from './components/ReloadOnboarding/ReloadOnboarding';
import style from './Footer.module.scss';

const Footer: React.FC = () => {
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
        <div className={style.iconContainer}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div>
              <HelpModule />
              <ReloadOnboarding />
            </div>
            <Divider orientation="vertical" className={dividerTheme} flexItem />

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
