function parseDate() {
  let currentDate = new Date().toLocaleDateString().replaceAll("-", " / ");

  console.log(currentDate);
  return currentDate;
}

module.exports = { parseDate };
