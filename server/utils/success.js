export const createSuccess = (status, dataName, message) => {
  res.status(status).json(`${dataName} has been ${message} successful`);
  console.log(`${message} ${dataName} successful!`);
};
