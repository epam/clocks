import { FC, useContext } from 'react';
import { MenuItem, withStyles, makeStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';

import { ThemeContext } from '../../context/theme';
import { ICustomItemProps } from './CustomItem.interface';

import styles from './CustomItem.module.scss';

const Item = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: 8,
    borderRadius: 4,
    boxShadow:
      theme.palette.type === 'light'
        ? 'rgb(212, 217, 225) 0 1px 3px 0'
        : 'rgb(34, 34, 34) 0 1px 3px 0',
    margin: '10px 5px 0 5px'
  }
}))(MenuItem);

const useStyle = makeStyles(theme => ({
  badge: {
    display: 'block',
    '& span.MuiBadge-badge': {
      transform: 'translate(0, -50%)',
      padding: '1em',
      backgroundColor: theme.palette.primary.main,
      color: 'white'
    }
  }
}));

const CustomItem: FC<ICustomItemProps> = ({
  target,
  onSelect,
  added = false
}) => {
  const css = useStyle();
  const {
    state: { type }
  } = useContext(ThemeContext);

  const Render = () => (
    <Item
      onClick={() => onSelect(target)}
      className={
        added
          ? clsx(
              { [styles.disabledLight]: type === 'light' },
              { [styles.disabledDark]: type === 'dark' }
            )
          : ''
      }
    >
      <div className={styles.text}>
        <div className={styles.title}>
          <span className={styles.city}>{target.city}</span>
        </div>
        <span
          className={clsx(
            { [styles.countryLight]: type === 'light' },
            { [styles.countryDark]: type === 'dark' }
          )}
        >
          {target.country}
          {target.province ? `, ${target.province}` : ''}
        </span>
      </div>
    </Item>
  );

  return added ? (
    <Badge
      data-testid="Badge"
      // className={clsx(
      //   { [styles.badgeLight]: type === 'light' },
      //   { [styles.badgeDark]: type === 'dark' }
      // )}
      className={css.badge}
      badgeContent="Added"
      color="primary"
    >
      <Render />
    </Badge>
  ) : (
    <Render />
  );
};

export default CustomItem;
