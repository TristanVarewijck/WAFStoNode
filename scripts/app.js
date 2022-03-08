// imports
import { addFilters } from "./partials/filterButtons.js";
import { parseDate } from "./partials/parseCurrentDate.js";
import { scrollToTop } from "./partials/toTopButton.js";
import { onScroll } from "./partials/onScroll.js";
import { getData } from "./data/fetch.js";

const mybutton = document.querySelector("body > button");
mybutton.addEventListener("click", scrollToTop);

// GET DATA
getData();

window.onload = getData();

window.onscroll = () => {
  onScroll();
};

// Scroll top top behaviour
scrollToTop();

// Current date
parseDate();

// Call filters
addFilters();
