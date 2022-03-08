import { apiKey } from "../apiProvider.js";
import { displayEmptyState, hideEmptyState } from "../empty.js";
import { displayLoading, hideLoading } from "../loader.js";
import { articleContent } from "./articleContents.js";
import { routing } from "../routing.js";

const form = document.querySelector("form:first-of-type");
const input = document.querySelector("form:first-of-type input");
const title = document.querySelector("h1");
const articlesContainer = document.querySelector(
  "main:first-of-type section section:last-of-type ul"
);

form.addEventListener("submit", getData); // form submit

function getData(e) {
  // Show loading state
  displayLoading();

  if (input.value) {
    e.preventDefault();
    title.innerHTML = `News: ${input.value}`;
  } else {
    title.innerHTML = `News: Latest`;
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
      hideLoading();
      let articles = myJson.articles;
      hideLoading();
      // decide if empty state is needed...
      articles.length <= 0 ? displayEmptyState(input.value) : hideEmptyState();
      return articles;
    })
    .then(articleContent)
    .then(routing)
    .catch((err) => {
      console.log(err);
    });
}

export { getData };
