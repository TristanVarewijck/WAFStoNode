const loader = document.querySelector(
  "main:first-of-type > section section:first-of-type"
);
function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}

export { displayLoading, hideLoading };
