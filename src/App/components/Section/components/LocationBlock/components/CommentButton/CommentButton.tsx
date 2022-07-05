import React, { useMemo, useRef } from 'react';
import clsx from 'clsx';
import { t } from 'i18next';

import { CommentOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { useSelector } from 'react-redux';
import useTheme from '../../../../../../hooks/useTheme';
import { IInitialState } from '../../../../../../redux/types';
import Onboarding from '../../../Onboarding/Onboarding';

import style from '../../LocationBlock.module.scss';
import { ICommentButtonProps } from './CommentButton.types';

const CommentButton: React.FC<ICommentButtonProps> = ({ index, openCommentModal }) => {
  const anchorComment = useRef(null);

  const iconTheme = useTheme(style.lightIcon, style.darkIcon);

  const { deleteMode, dragDropMode, planningMode, onboarding } = useSelector(
    (state: IInitialState) => state
  );
  const disabled = useMemo(
    () => deleteMode.isOn || dragDropMode.isOn || planningMode.isOn,
    [planningMode, deleteMode, dragDropMode]
  );

  const commentTooltipText = useMemo((): string => t('LocationBlock.TooltipComment'), []);
  return (
    <>
      <Tooltip title={commentTooltipText} arrow>
        <IconButton
          ref={anchorComment}
          tabIndex={0}
          size="small"
          onClick={openCommentModal}
          disabled={disabled}
        >
          <CommentOutlined
            className={clsx({
              [iconTheme]: true,
              [style.disabledIcon]: disabled
            })}
          />
        </IconButton>
      </Tooltip>

      {!index && onboarding?.comment && anchorComment.current && (
        <Onboarding
          open={onboarding.comment}
          anchorElement={anchorComment.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          title={t('Onboarding.AddCommentTitle')}
          text={t('Onboarding.AddCommentContent')}
        />
      )}
    </>
  );
};

export default CommentButton;
