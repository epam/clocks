import React, { useMemo, useRef } from 'react';
import { t } from 'i18next';
import clsx from 'clsx';

import { FmdGoodOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import useLocations from '../../../../../../hooks/useLocations';
import useTheme from '../../../../../../hooks/useTheme';
import { setUserLocation } from '../../../../../../redux/actions';
import { IInitialState, IUrlLocation } from '../../../../../../redux/types';
import Onboarding from '../../../Onboarding/Onboarding';

import style from '../../LocationBlock.module.scss';
import { IPinButtonProps } from './PinButton.types';

const PinButton: React.FC<IPinButtonProps> = ({ location, index, urlUserLocation }) => {
  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const anchorLocation = useRef(null);
  const dispatch = useDispatch();

  const { locations, setLocations } = useLocations();

  const locationTooltipText = useMemo(
    (): string => t('LocationBlock.TooltipSetCurrentLocation'),
    []
  );

  const { deleteMode, onboarding } = useSelector((state: IInitialState) => state);
  const { userLocation } = useSelector((state: IInitialState) => state.locations);

  const disabled = useMemo(() => deleteMode.isOn, [deleteMode]);

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const handleSetUserLocation = () => {
    location && dispatch(setUserLocation(location));
    Object.values(locations).forEach((urlLocation: IUrlLocation) => {
      if (urlLocation.city === location?.city && urlLocation.lat === location?.lat) {
        urlLocation.userLocation = true;
      } else {
        urlLocation.userLocation = false;
      }
    });
    setLocations(locations);
  };

  return (
    <>
      <Tooltip title={locationTooltipText} arrow>
        <IconButton
          ref={anchorLocation}
          tabIndex={0}
          size="small"
          onClick={handleSetUserLocation}
          disabled={disabled}
        >
          <FmdGoodOutlined
            className={clsx({
              [iconTheme]: true,
              [style.blueIcon]: urlUserLocation || isUserLocation,
              [style.disabledIcon]: disabled
            })}
          />
        </IconButton>
      </Tooltip>

      {!index && onboarding?.myLocation && anchorLocation.current && (
        <Onboarding
          open={onboarding.myLocation}
          anchorElement={anchorLocation.current}
          nextElement="comment"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          title={t('Onboarding.LocationTitle')}
          text={t('Onboarding.LocationContent')}
        />
      )}
    </>
  );
};

export default PinButton;
