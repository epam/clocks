import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import clsx from 'clsx';

import { ICustomItemProps } from './CustomItem.interface';

import styles from './CustomItem.module.scss';

const CustomItem: FC<ICustomItemProps> = ({
  type,
  target,
  onSelect,
  added = false
}) => {
  const { t } = useTranslation();

  const Render = () => (
    <MenuItem
      onClick={() => onSelect(target)}
      classes={{
        root: clsx({
          [styles.itemLight]: type === 'light',
          [styles.itemDark]: type === 'dark',
          [styles.disabled]: added
        })
      }}
    >
      <div className={styles.text}>
        <div className={styles.title}>
          <span
            className={clsx(
              styles.city,
              { [styles.countryLight]: type === 'light' },
              { [styles.countryDark]: type === 'dark' }
            )}
          >
            {target.city}
          </span>
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
    </MenuItem>
  );

  return added ? (
    <Badge
      data-testid="Badge"
      classes={{
        root: styles.badgeRoot,
        badge: clsx(
          { [styles.badgeLight]: type === 'light' },
          { [styles.badgeDark]: type === 'dark' }
        )
      }}
      badgeContent={t('location.added')}
      color="primary"
    >
      <Render />
    </Badge>
  ) : (
    <Render />
  );
};

export default CustomItem;
