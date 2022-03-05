// imports
import { displayLoading, hideLoading } from "./loader.js";
import { addFilters } from "./filterButtons.js";
import { parseDate } from "./parseCurrentDate.js";
import { scrollToTop } from "./toTopButton.js";
import { apiKey } from "./apiProvider.js";
import { articleObserver } from "./articleObserver.js";

// variables
const input = document.getElementById("input");
const form = document.getElementById("form");
const articlesContainer = document.getElementById("cardsContainer");
const mybutton = document.getElementById("toTopButton");
const navbar = document.getElementById("navbar");
const mains = document.querySelectorAll("main");
const speechForm = document.getElementById("speechForm"),
  textInput = document.getElementById("textInput"),
  speakButton = document.getElementById("speechButton"),
  cancelButton = document.getElementById("cancelButton");

let prevScrollpos = window.scrollY;

// Eventlisteners
form.addEventListener("submit", getData); // form submit
mybutton.addEventListener("click", scrollToTop); // to top button call
// document.addEventListener("scroll", scanDocument); // call article animation

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
      });

      // config for observer
      const articlesToObserve = document.querySelectorAll(
        ".articleCard:not(:first-of-type)"
      );
      articleObserver(articlesToObserve);

      return articles;
    })
    .catch((err) => {
      console.log(err);
    });
}
window.onload = getData();

// browsers
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

// check browser support
if (SpeechSynthesisUtterance !== undefined) {
  console.log("supported");
} else {
  console.log("not supported");
}

const settings = {
  lang: "en-GB",
  pitch: 1,
  rate: 1.05,
  volume: 0.7,
};

// get the api
let synth = window.speechSynthesis;

// text input
textInput.innerHTML =
  "My BBC Africa colleagues and I have been intimidated by ultra football fans in Przemyśl, in southern Poland, where we have been reporting on those fleeing the conflict in Ukraine. We had been hearing over the last few days that they had come into the city to protect it from African and Asian refugees crossing over from Ukraine";

// speak on submit
speechForm.onsubmit = function (event) {
  event.preventDefault();

  cancelButton.addEventListener("click", function () {
    synth.cancel();
  });

  // text to speak >> textInput (new utterance of nieuwe uiting)
  let utterance = new SpeechSynthesisUtterance(textInput.innerHTML);
  // voice settings
  utterance.lang = settings.lang;
  utterance.pitch = settings.pitch;
  utterance.rate = settings.rate;
  utterance.volume = settings.volume;
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
