// imports
import { displayLoading, hideLoading } from "./loader.js";
import { scanDocument } from "./articleAnimation.js";
import { addFilters } from "./filterButtons.js";
import { parseDate } from "./parseCurrentDate.js";
import { scrollToTop } from "./toTopButton.js";
import { apiKey } from "./apiProvider.js";

// variables
const input = document.getElementById("input");
const form = document.getElementById("form");
const articlesContainer = document.getElementById("cardsContainer");
const mybutton = document.getElementById("toTopButton");
const navbar = document.getElementById("navbar");
const mains = document.querySelectorAll("main");
let prevScrollpos = window.scrollY;

// Eventlisteners
form.addEventListener("submit", getData); // form submit
mybutton.addEventListener("click", scrollToTop); // to top button call
document.addEventListener("scroll", scanDocument); // call article animation

// Routes
routie({
  "article/:id": (id) => {
    console.log(id);
    updateUI("template");
  },
  landing: () => {
    updateUI("landing");
  },
  error: () => {
    updateUI("error");
  },
});

// Update UI for pages
function updateUI(route) {
  mains.forEach((main) => {
    main.classList.add("disabled");
  });
  let activeMain = document.querySelector(`[data-route=${route}]`);
  console.log(activeMain);
  activeMain.classList.remove("disabled");
}

// Function
function getData(e) {
  // Show loading state
  displayLoading();

  if (input.value) {
    e.preventDefault();
  }

  while (articlesContainer.firstChild) {
    articlesContainer.removeChild(articlesContainer.firstChild);
  }

  fetch(
    input.value
      ? `https://newsapi.org/v2/everything?q=${input.value}&from=2022-02-15&sortBy=publishedAt&language=en&apiKey=${apiKey}`
      : "/test.json"
  )
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      // Hide loading state
      hideLoading();
      let articles = myJson.articles;
      return articles;
    })
    .then((articles) => {
      console.log(articles);
      // Function
      articles.map((article) => {
        // Function
        let publishedAt = new Date(article.publishedAt);
        publishedAt = publishedAt.toString().substring(3, 25);
        publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);

        article.id = `${Math.floor(Math.random() * 100)}`;
        const articleContents = `
        <div style="background-image:url(${
          article.urlToImage
            ? article.urlToImage
            : "./assets/icons/no-image.svg"
        })"></div>

        <article>
        <a href=#article/${article.id}>
          <h2>${article.title}</h2>
          </a>
            <div>
            <small><i class="fa-solid fa-clock"></i>${publishedAt}</small>
            <small><i class="fa-solid fa-file-signature"></i> ${
              article.author ? article.author : "-"
            }</small>
            </div>
        </article>
        
  `;
        const articleCard = document.createElement("li");
        articleCard.className = "articleCard";
        articleCard.innerHTML = articleContents;
        articlesContainer.appendChild(articleCard);
        articleCard.classList.add("toTopAnimation");

        const firstArticle = document.querySelector(
          "#cardsContainer li:first-child"
        );
        firstArticle.classList.remove("toTopAnimation");
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
window.onload = getData();

// onScroll behaviours
window.onscroll = () => {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ? (mybutton.style.display = "block")
    : (mybutton.style.display = "none");

  let currentScrollPos = window.scrollY;
  prevScrollpos > currentScrollPos
    ? (navbar.style.top = "0")
    : (navbar.style.top = "-75px");
  prevScrollpos = currentScrollPos;
};

// Scroll top top behaviour
scrollToTop();

// Current date
parseDate();

// Call filters
addFilters();
