// IMPORTS
// import { parseDate } from "./partials/parseCurrentDate.js";
import { scrollToTop } from "./partials/toTopButton.js";
import { onScroll } from "./partials/onScroll.js";
import { articleObserver } from "./partials/articleObserver.js";

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
