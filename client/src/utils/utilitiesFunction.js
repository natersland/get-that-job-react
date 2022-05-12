const UtilitiesFunction = () => {
  // filtered comma from number fx -------------------------------------------------
  const filterComma = (salary) => {
    let result = salary.replace(/[^\w\s]/gi, "");
    return Number(result);
  };
  // ---------------------------------------------------------------------

  // toUpperCaseFx -------------------------------------------------
  const textUpperCase = (props) => {
    const text = props;
    return text.toUpperCase();
  };
  // ---------------------------------------------------------------------

  return { filterComma, textUpperCase };
};
export default UtilitiesFunction;
