// imports
import { displayLoading, hideLoading } from "./loader.js";
import { addFilters } from "./filterButtons.js";
import { parseDate } from "./parseCurrentDate.js";
import { scrollToTop } from "./toTopButton.js";
import { apiKey } from "./apiProvider.js";
import { articleObserver } from "./articleObserver.js";

// variables
const input = document.querySelector("#searchForm input");
const form = document.getElementById("searchForm");
const articlesContainer = document.querySelector(
  "main:first-of-type section section:last-of-type ul"
);
const mybutton = document.querySelector("body > button");
const navbar = document.querySelectorAll("nav");
const mains = document.querySelectorAll("main");
const speechForm = document.getElementById("speechForm"),
  textInput = document.getElementById("textInput"),
  speakButton = document.getElementById("speechButton"),
  cancelButton = document.getElementById("cancelButton");
// get the api
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
routie({
  "article/:id": (id) => {
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

// check browser support
if (SpeechSynthesisUtterance !== undefined) {
  console.log("supported");
} else {
  console.log("not supported");
}

// text input
textInput.innerHTML =
  "The number of refugees fleeing the war in Ukraine could soon exceed 1.5m people, according to the UN refugee agency (UNHCR).This is the fastest moving refugee crisis we have seen in Europe since the end of World War Two, the UNHCR's head told Reuters news agency Around 1.3m people have already fled their homes since the invasion began. Poland is said to have taken in over half of all the refugees so far, according to the country's president. The number is also high in countries like Hungary and Romania. But not all refugees are choosing to stay in the countries they first arrive in. Take Romania for instance. Of the 200,000 people who travelled there in the first eight days of the war, 140,000 then left to travel onto other countries, leaving around 60,000 in Romania, according to the UNHCR. Countries bordering Ukraine are therefore acting as the first stop for many people fleeing the war, as they travel onto other European countries further away.";
// speak on submit
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
