const empty = document.querySelector(
  "main:first-of-type > section section:nth-of-type(2)"
);
const unvalidSearchTerm = document.querySelector(
  "main:first-of-type > section section:nth-of-type(2) p span"
);

function displayEmptyState(value) {
  empty.classList.add("display");
  unvalidSearchTerm.innerHTML = value;
}

function hideEmptyState() {
  empty.classList.remove("display");
}

export { displayEmptyState, hideEmptyState };
