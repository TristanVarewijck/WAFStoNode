const filters = [
  "All",
  "Crypto",
  "AI",
  "Elon Musk",
  "5G",
  "Amazon",
  "Metaverse",
  "Jeff Bezos",
];
const filtersContainer = document.getElementById("filtersContainer");

function addFilters() {
  filters.forEach((filter) => {
    const filterItem = document.createElement("li");
    filterItem.className = "filterItem";
    filtersContainer.appendChild(filterItem);

    const filterButton = document.createElement("button");
    filterButton.className = "filterButton";
    filterButton.value = filter;
    filterItem.appendChild(filterButton);
    filterButton.innerHTML = filter;
  });
}

export { addFilters };
