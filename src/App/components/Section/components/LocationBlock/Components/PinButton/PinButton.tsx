import { FmdGoodOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import clsx from 'clsx';
import React, { useMemo, useRef } from 'react';
import { setUserLocation } from '../../../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import useLocations from '../../../../../../hooks/useLocations';
import { IInitialState, IUrlLocation } from '../../../../../../redux/types';
import { t } from 'i18next';
import style from '../../LocationBlock.module.scss';
import useTheme from '../../../../../../hooks/useTheme';
import { IPinButtonProps } from './PinButton.types';

const PinButton: React.FC<IPinButtonProps> = ({ location, urlUserLocation }) => {
  const anchorLocation = useRef(null);
  const { locations, setLocations } = useLocations();
  const { deleteMode, dragDropMode, planningMode } = useSelector((state: IInitialState) => state);
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
    [t]
  );

  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

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
    </>
  );
};

export default PinButton;
