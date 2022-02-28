const loader = document.getElementById("loading");
function displayLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}

export { displayLoading, hideLoading };
