const datePlaceholder = document.getElementById("currentDate");

function parseDate() {
  let currentDate = new Date().toLocaleDateString().replaceAll("-", " / ");
  datePlaceholder.innerHTML = currentDate;
}

export { parseDate };
