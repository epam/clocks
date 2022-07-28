import React from 'react';

import style from './useFlag.module.scss';

const useFlag = () => {
  function codeToCountryFlag(iso2: string) {
    return (
      <img
        className={style.flagImg}
        src={require(`./flags/${iso2.toLowerCase()}.png`)}
        alt={iso2}
      />
    );
  }

  return codeToCountryFlag;
};

export default useFlag;
