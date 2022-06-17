import { Button, Modal, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import style from './HelpModule.module.scss';
import { t } from 'i18next';
import useTheme from '../../../../hooks/useTheme';

const HelpModule = () => {
  const bodyTheme = useTheme(style.lightBody, style.darkBody);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tooltipText = useMemo((): string => t('HelpModule.buttonTooltip'), [t]);
  return (
    <div className={style.container}>
      <Tooltip placement="top" title={tooltipText} arrow>
        <HelpIcon onClick={handleOpen}>Open Module</HelpIcon>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={bodyTheme}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t('HelpModule.headerText')}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>{t('HelpModule.headerInfo')}</p>
            <p> {t('HelpModule.ItIs')}</p>
            <ul>
              <li>{t('HelpModule.feature1')}</li>
              <li>{t('HelpModule.feature2')}</li>
              <li>{t('HelpModule.feature3')}</li>
              <li>{t('HelpModule.feature4')}</li>
              <li>{t('HelpModule.feature5')}</li>
              <li>{t('HelpModule.feature6')}</li>
              <li>{t('HelpModule.feature7')}</li>
            </ul>
            <p>{t('HelpModule.HappyUse')}</p>
          </Typography>
          <div className={style.buttonContainer}>
            <Button className={style.button} onClick={handleClose}>
              {t('Settings.CancelButton')}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default HelpModule;
