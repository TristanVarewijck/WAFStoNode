const datePlaceholder = document.querySelector(
  "main:first-of-type nav ul li:nth-child(1) p"
);

function parseDate() {
  let currentDate = new Date().toLocaleDateString().replaceAll("-", " / ");
  datePlaceholder.innerHTML = currentDate;
}

export { parseDate };
