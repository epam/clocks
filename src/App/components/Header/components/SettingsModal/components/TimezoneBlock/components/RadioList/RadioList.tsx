import { useState } from 'react';
import { Radio } from '@mui/material';
import style from '../../../../SettingsModal.module.scss';
import { truncate } from '../../../../../../../../utils/truncate';

type radioListProps = {
  id: string;
  value: string;
  translate: string;
};

const RadioList = ({ id, value, translate }: radioListProps) => {
  const [isTruncate, setIsTruncate] = useState(true);

  return (
    <div onMouseEnter={() => setIsTruncate(false)} onMouseLeave={() => setIsTruncate(true)}>
      <Radio id={id} value={value} size="small" />
      <label className={style.cursorPointer} htmlFor={id}>
        {isTruncate ? truncate(translate, 24) : translate}
      </label>
    </div>
  );
};

export default RadioList;
