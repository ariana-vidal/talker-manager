const verDate = (date) => {
  const dateParts = date.split('/');
  const day = Number(dateParts[0]);
  const month = Number(dateParts[1]);

  const validDay = day > 0 && day <= 31;
  const validMonth = month > 0 && month <= 12;

  if (validDay && validMonth) return true;
  return false;
};

const dateFormat = (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date);

const verificaDate = (date) => verDate(date) && dateFormat(date);

module.exports = verificaDate;