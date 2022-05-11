const UtilitiesFunction = () => {
  const filterComma = (salary) => {
    let result = salary.replace(/[^\w\s]/gi, "");
    return Number(result);
  };
  return { filterComma };
};

export default UtilitiesFunction;
