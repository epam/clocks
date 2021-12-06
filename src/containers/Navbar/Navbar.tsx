import { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip
} from '@material-ui/core';
import { SettingsOutlined, Add } from '@mui/icons-material';
import { LocationsContext } from '../../context/locations';
import logo from '../../assets/images/logo.svg';
import { EpamColors } from '../../constants';
import { DashboardName } from '../../components/DashboardName';
import { SettingsContext } from '../../context/settings';
import CopyURLButton from '../CopyURLButton';

const useStyles = makeStyles(theme => ({
  appbar: {
    boxShadow: 'none',
    background: EpamColors.darkGray,
    borderBottom: '2px solid rgba(0,0,0,.06)',
    color: 'white'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    height: 28,
    objectFit: 'cover',
    cursor: 'pointer',
    marginRight: 12
  },
  buttons: {
    display: 'flex',
    alignItems: 'center'
  },
  modeIcon: {
    color: theme.palette.background.paper
  },
  addCityButton: {
    marginLeft: '1rem',
    marginRight: '1rem'
  }
}));

const Navbar: FC = () => {
  const classes = useStyles();
  const {
    actions: { CreateFormHandler, ResetUrl }
  } = useContext(LocationsContext);
  const {
    actions: { SettingsModalHandler }
  } = useContext(SettingsContext);

  const createFormHandler = () => {
    if (CreateFormHandler) {
      CreateFormHandler(true);
    }
  };

  const settingsModalHandler = () => {
    if (SettingsModalHandler) {
      SettingsModalHandler();
    }
  };

  return (
    <AppBar position="static" className={classes.appbar} color="transparent">
      <Toolbar className={classes.toolbar}>
        <div className="content-center">
          <Button onClick={ResetUrl}>
            <img className={classes.title} src={logo} alt="logo" />
          </Button>
          <DashboardName />
        </div>
        <div className={classes.buttons}>
          <IconButton
            data-testid="settings-icon"
            onClick={settingsModalHandler}
          >
            <SettingsOutlined sx={{ color: '#fff' }} />
          </IconButton>
          <CopyURLButton />
          <Tooltip
            title="Toggle, + or = to toggle drawer"
            enterDelay={1000}
            leaveDelay={200}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={createFormHandler}
              className={classes.addCityButton}
              endIcon={<Add />}
            >
              Add City
            </Button>
          </Tooltip>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
