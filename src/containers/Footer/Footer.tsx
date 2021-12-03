import { makeStyles, Typography } from '@material-ui/core';
import {
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  GitHub
} from '@mui/icons-material';
import { EpamColors } from '../../constants';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 64,
    padding: '0 24px',
    background: EpamColors.darkGray,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rights: {
    color: 'inherit',
    fontWeight: 300
  },
  icons: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      color: 'white',
      textDecoration: 'none',
      verticalAlign: 'middle',
      margin: '0 10px'
    }
  }
}));

const Footer = () => {
  const css = useStyles();
  return (
    <footer className={css.root}>
      <Typography variant="caption" className={css.rights} gutterBottom>
        © {new Date().getFullYear()} EPAM Systems, Inc. <br />
        All Rights Reserved.
      </Typography>
      <div className={css.icons}>
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
