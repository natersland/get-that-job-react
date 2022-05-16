const UtilitiesFunction = () => {
  // Add & remove Comma to Number Function: Add to display UI salary -------------------------------------------------
  const addCommas = (num) =>
    Number(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const removeCommas = (num) => num.toString().replace(/[^0-9]/g, "");
  // filtered comma from string number -------------------------------------------------
  const filterComma = (salary) => {
    let result = salary.replace(/[^\w\s]/gi, "");
    return Number(result);
  };
  // toUpperCaseFx -------------------------------------------------
  const textUpperCase = (props) => {
    const text = props;
    return text.toUpperCase();
  };
  // ---------------------------------------------------------------------

  return { filterComma, textUpperCase, addCommas, removeCommas };
};
export default UtilitiesFunction;
