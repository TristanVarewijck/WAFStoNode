// imports
import { displayLoading, hideLoading } from "./loader.js";
import { addFilters } from "./filterButtons.js";
import { parseDate } from "./parseCurrentDate.js";
import { scrollToTop } from "./toTopButton.js";
import { apiKey } from "./apiProvider.js";
import { articleObserver } from "./articleObserver.js";
import { displayEmptyState, hideEmptyState } from "./empty.js";

// variables
const title = document.querySelector("h1 span");
const input = document.querySelector("form:first-of-type input");
const form = document.querySelector("form:first-of-type");
const articlesContainer = document.querySelector(
  "main:first-of-type section section:last-of-type ul"
);

const mybutton = document.querySelector("body > button");
const navbar = document.querySelectorAll("nav");
const mains = document.querySelectorAll("main");
const speechForm = document.getElementById("speechForm"),
  textInput = document.querySelector("#speechForm p"),
  speakButton = document.querySelector(
    "main:nth-of-type(2) button:first-of-type"
  ),
  cancelButton = document.querySelector(
    "main:nth-of-type(2) button:last-of-type"
  );
let articles;

// GET SPEECH API
let synth = window.speechSynthesis;
const speechSettings = {
  lang: "en-GB",
  pitch: 1,
  rate: 1.05,
  volume: 0.7,
};
// browsers
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;
let prevScrollpos = window.scrollY;

// Eventlisteners
form.addEventListener("submit", getData); // form submit
mybutton.addEventListener("click", scrollToTop); // to top button call
// document.addEventListener("scroll", scanDocument); // call article animation

// Routes

// GET DATA
function getData(e) {
  // Show loading state
  displayLoading();

  if (input.value) {
    e.preventDefault();
    title.innerHTML = `"${input.value}"`;
  } else {
    title.innerHTML = "Breaking";
  }

  while (articlesContainer.firstChild) {
    articlesContainer.removeChild(articlesContainer.firstChild);
  }

  fetch(
    input.value
      ? `https://newsapi.org/v2/everything?q=${input.value}&sortBy=publishedAt&language=en&pageSize=100&apiKey=${apiKey}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      articles = myJson.articles;
      // Hide loading state
      hideLoading();
      // decide if empty state is needed...
      articles.length <= 0 ? displayEmptyState(input.value) : hideEmptyState();

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
            // article.date = publishedAt;
          });
        }

        const articleContents = `
        <div  style="background-image:url(${
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
      });

      // config for observer
      const articlesToObserve = document.querySelectorAll(
        ".articleCard:not(:first-of-type)"
      );
      articleObserver(articlesToObserve);

      return articles;
    })
    .then((articles) => {
      const detailContentContainer = document.querySelector(
        "main:nth-of-type(2) section article"
      );
      console.log(detailContentContainer);
      routie({
        "article/:id": (id) => {
          console.log(id);
          let detailArticle = articles.filter((item) => `${item.id}` === id);
          console.log(detailArticle);

          detailArticle.forEach((item) => {
            const template = ` 
            <div class="bgImage" style="background-image:url(${
              item.urlToImage ? item.urlToImage : "./assets/icons/no-image.svg"
            })"></div>
            <h2>
              ${item.title}
            </h2>
    
            <div>
              <small><i class="fa-solid fa-file-signature"></i>${
                item.author
              }</small>
              <div>
                <button form="speechForm" type="submit">
                  <i class="fa-solid fa-headphones"></i>
                </button>
    
                <button class="hidden" type="button">
                  <!-- default state is "hidden"-->
                  <i class="fa-solid fa-stop"></i>
                </button>
              </div>
              <small><i class="fa-solid fa-clock"></i>-</small>
            </div>`;

            const detailSection = document.createElement("div");
            detailSection.innerHTML = template;
            detailContentContainer.appendChild(detailSection);
            textInput.innerHTML = item.content;
          });

          updateUI("template");
        },
        " ": () => {
          updateUI("landing");
          synth.cancel();
        },
        error: () => {
          updateUI("error");
          synth.cancel();
        },
      });
      function updateUI(route) {
        mains.forEach((main) => {
          main.classList.add("disabled");
        });
        let activeMain = document.querySelector(`[data-route=${route}]`);
        activeMain.classList.remove("disabled");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
window.onload = getData();

// check browser support
SpeechSynthesisUtterance !== undefined
  ? console.log("supported")
  : console.log("not supported");
// text input

speechForm.onsubmit = function (event) {
  event.preventDefault();

  cancelButton.addEventListener("click", function () {
    synth.cancel();
  });

  // text to speak >> textInput (new utterance of nieuwe uiting)
  let utterance = new SpeechSynthesisUtterance(textInput.innerHTML);
  // voice settings
  utterance.lang = speechSettings.lang;
  utterance.pitch = speechSettings.pitch;
  utterance.rate = speechSettings.rate;
  utterance.volume = speechSettings.volume;
  // actually speak the utterance
  synth.speak(utterance);

  // add class when speaking
  utterance.addEventListener("start", function () {
    speakButton.classList.add("speaking");
    cancelButton.classList.remove("hidden");
  });

  // remove class when speaking
  utterance.addEventListener("end", function () {
    speakButton.classList.remove("speaking");
    cancelButton.classList.add("hidden");
  });
};

// onScroll behaviours
window.onscroll = () => {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ? (mybutton.style.display = "block")
    : (mybutton.style.display = "none");

  let currentScrollPos = window.scrollY;

  navbar.forEach((nav) => {
    prevScrollpos > currentScrollPos
      ? (nav.style.top = "0")
      : (nav.style.top = "-75px");
  });

  prevScrollpos = currentScrollPos;
};

// Scroll top top behaviour
scrollToTop();

// Current date
parseDate();

// Call filters
addFilters();
