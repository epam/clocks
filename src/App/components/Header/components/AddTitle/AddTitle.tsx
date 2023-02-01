import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const AddTitle: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {openModal ? (
        <>
          <input placeholder="Type Here" />
          <button onClick={() => console.log('hello')}>{t('AddTitle.Submit')}</button>
          <button onClick={() => setOpenModal(false)}>{t('AddTitle.Close')}</button>
        </>
      ) : (
        <button onClick={() => setOpenModal(true)}>{t('AddTitle.Edit')}</button>
      )}
    </>
  );
};
