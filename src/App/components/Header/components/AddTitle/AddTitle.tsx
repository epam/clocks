import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AddTitle: React.FC = () => {
  const inputRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [updated, setUpdated] = useState('');
  const { t } = useTranslation();

  const handleClickFunction = () => {
    setUpdated(inputRef.current.value);
    setOpenModal(false);
  };

  return (
    <>
      {openModal ? (
        <>
          <input placeholder="Type Here" ref={inputRef} />
          <button onClick={() => handleClickFunction()}>{t('AddTitle.Submit')}</button>
          <button onClick={() => setOpenModal(false)}>{t('AddTitle.Close')}</button>
        </>
      ) : (
        <button onClick={() => setOpenModal(true)}>{t('AddTitle.Edit')}</button>
      )}
      <h1>{updated}</h1>
    </>
  );
};
