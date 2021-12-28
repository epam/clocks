import { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import {
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  GitHub
} from '@mui/icons-material';

import styles from './Footer.module.scss';

const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.root}>
      <div className={`${styles.rights} ${styles.rights}`}>
        <Trans
          t={t}
          i18nKey="footer.rights"
          values={{ date: new Date().getFullYear() }}
          components={{ br: <br /> }}
        />
      </div>
      <div className={`${styles.icons} ${styles.icons}`}>
        <a
          href="https://github.com/epam"
          data-testid="GitHubIconLink"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub />
        </a>
        <a
          href="https://www.linkedin.com/company/epam-systems/"
          data-testid="LinkedInIconLink"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn />
        </a>
        <a
          href="https://twitter.com/EPAMSYSTEMS"
          data-testid="TwitterIconLink"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </a>
        <a
          href="https://www.facebook.com/EPAM.Global"
          data-testid="FacebookIconLink"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook />
        </a>
        <a
          href="https://www.instagram.com/epamsystems/"
          data-testid="InstagramIconLink"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram />
        </a>
      </div>
    </footer>
  );
};
export default Footer;
