// imports
import { displayLoading, hideLoading } from "./loader.js";
import { scanDocument } from "./articleAnimation.js";
import { addFilters } from "./filterButtons.js";
import { parseDate } from "./parseCurrentDate.js";
import { scrollToTop } from "./toTopButton.js";
import { apiKey } from "./apiProvider.js";
import { imageObserver } from "./imageObserver.js";

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
    updateUI("template");
  },
  landing: () => {
    updateUI("landing");
  },
  error: () => {
    updateUI("error");
  },
});

// Update UIfor pages
function updateUI(route) {
  mains.forEach((main) => {
    main.classList.add("disabled");
  });
  let activeMain = document.querySelector(`[data-route=${route}]`);
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
      ? `https://newsapi.org/v2/everything?q=${input.value}&from=2022-02-15&sortBy=publishedAt&language=en&pageSize=100&apiKey=${apiKey}`
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
      // Function
      articles.map((article) => {
        // Function
        let publishedAt = new Date(article.publishedAt);
        publishedAt = publishedAt.toString().substring(3, 25);
        publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);

        for (let i = 0; i < articles.length; i++) {
          articles.forEach((article) => {
            article.id = i++;
          });
        }

        const articleContents = `
        <div class="bgImage" style="background-image:url(${
          article.urlToImage
            ? article.urlToImage
            : "./assets/icons/no-image.svg"
        })"></div>

        <article>
        <a href=#article/${article.id} onclick="detailArticle()">
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

      // config for observer
      const images = document.querySelectorAll(
        ".articleCard:not(:first-of-type) > div"
      );
      imageObserver(images);

      return articles;
    })
    .catch((err) => {
      console.log(err);
    });
}
window.onload = getData();

const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

let voices;

const speechForm = document.getElementById("speechForm"),
  voiceInput = document.getElementById("voiceInput");

voiceInput.value =
  "Price: The 2022 Ford Expedition starts at $51,080.The 2022 Ford Expedition full-size SUV can seat up to eight, hit the highway, and go off-road. Its a roomy and versatile vehicle, and the longer Max";

// check browser support
if (SpeechSynthesisUtterance !== undefined) {
  console.log("supported");
} else {
  console.log("not supported");
}

speechForm.onsubmit = function (event) {
  event.preventDefault();

  let utterance = new SpeechSynthesisUtterance(voiceInput.value);
  utterance.lang = "eng-GB";
  window.speechSynthesis.speak(utterance);
};

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
