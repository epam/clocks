import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { t } from 'i18next';

import { FmdGoodOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { setUserLocation } from '../../../../../../redux/actions';
import useLocations from '../../../../../../hooks/useLocations';
import { IInitialState, IUrlLocation } from '../../../../../../redux/types';
import useTheme from '../../../../../../hooks/useTheme';
import Onboarding from '../../../Onboarding/Onboarding';

import style from '../DragDropContainer/DragDropContainer.module.scss';
import { IPinButtonProps } from './PinButton.types';

const PinButton: React.FC<IPinButtonProps> = ({ location, urlUserLocation, index }) => {
  const anchorLocation = useRef(null);

  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { locations, setLocations } = useLocations();

  const { deleteMode, dragDropMode, planningMode, onboarding } = useSelector(
    (state: IInitialState) => state
  );
  const { userLocation } = useSelector((state: IInitialState) => state.locations);
  const dispatch = useDispatch();

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

  const disabled = useMemo(
    () => deleteMode.isOn || dragDropMode.isOn || planningMode.isOn,
    [planningMode, deleteMode, dragDropMode]
  );

  const isUserLocation = useMemo(() => {
    return location?.city === userLocation?.city && location?.lat === userLocation?.lat;
  }, [userLocation?.city, userLocation?.lat, location?.city, location?.lat]);

  const locationTooltipText = useMemo(
    (): string => t('LocationBlock.TooltipSetCurrentLocation'),
    []
  );

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
