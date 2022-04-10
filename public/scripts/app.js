// IMPORTS
// import { parseDate } from "./partials/parseCurrentDate.js";
import { scrollToTop } from "./partials/toTopButton.js";
import { onScroll } from "./partials/onScroll.js";
import { articleObserver } from "./partials/articleObserver.js";

// lazy loading images
const items = document.querySelectorAll(
  ".articleCard:not(:first-of-type) div img"
);

items.forEach((item) => {
  item.classList.add("lozad");
});

const imgObserver = lozad();
imgObserver.observe();

const mybutton = document.querySelector("body > button");
mybutton.addEventListener("click", scrollToTop);

// ONSCROLL

window.onscroll = () => {
  onScroll();
};

// TO TOP SCROLLING BUTTON
scrollToTop();

// CURRENT DATE
// parseDate();

// OBSERVE ANIMATION CARDS
articleObserver();
