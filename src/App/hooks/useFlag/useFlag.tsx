const useFlag = () => {
  const flag = (iso2: string) => {
    return <img src={require(`./flags/${iso2.toLowerCase()}.png`)} alt={iso2} />;
  };

  return flag;
};

export default useFlag;
