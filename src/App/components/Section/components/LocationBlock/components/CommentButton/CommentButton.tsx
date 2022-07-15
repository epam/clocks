import React, { useMemo, useRef, useState } from 'react';
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
import CommentModal from './components/CommentModal/CommentModal';

const CommentButton: React.FC<ICommentButtonProps> = ({ location, index }) => {
  const [commentModal, setCommentModal] = useState(false);

  const handleOpenCommentModal = () => {
    setCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setCommentModal(false);
  };
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
          onClick={handleOpenCommentModal}
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

      <CommentModal
        commentModal={commentModal}
        handleClose={handleCloseCommentModal}
        location={location}
      />

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
