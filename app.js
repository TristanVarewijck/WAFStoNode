const apiKey = "c9269540edae44718bb24d0041c75162";

// LOADING STATE
const loader = document.getElementById("loading");

displayLoading = () => {
  loader.classList.add("display");
};

hideLoading = () => {
  loader.classList.remove("display");
};

const input = document.getElementById("input");
const form = document.getElementById("form");
form.addEventListener("submit", getData);

// const filterButtons = document.querySelectorAll(".filterButton");
// // for (let i = 0; i < filterButtons.length; i++)
// //   filterButtons[i]. = clickEvent;
// for (let i = 0; i < filterButtons.length; i++) {
//   filterButtons[i].addEventListener("click", function () {
//     let clickValue = this.value;
//     getData(clickValue);
//   });
// }

function getData(e) {
  displayLoading();
  if (input.value) {
    e.preventDefault();
  }

  // DELETE EXISTING ARTICLE BOX
  const articlesContainer = document.getElementById("cardsContainer");
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
      hideLoading();
      let articles = myJson.articles;
      return articles;
    })
    .then((articles) => {
      articles.map((article) => {
        // FORMATE DATE
        let publishedAt = new Date(article.publishedAt);
        publishedAt = publishedAt.toString().substring(3, 25);
        publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);

        // MAKE CARD
        articleContents = `
        <div style="background-image:url(${
          article.urlToImage
            ? article.urlToImage
            : "./assets/icons/no-image.svg"
        })"></div>
        <article>
          <h2>${article.title}</h2>
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
    })
    .catch((err) => {
      console.log(err);
    });
}
window.onload = getData();

//Get the button:
const mybutton = document.getElementById("toTopButton");

// NAV SCROLL BAHAVIOUR
const navbar = document.getElementById("navbar");

let prevScrollpos = window.scrollY;
window.onscroll = () => {
  // scrollFunction();

  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ? (mybutton.style.display = "block")
    : (mybutton.style.display = "none");

  let currentScrollPos = window.scrollY;

  prevScrollpos > currentScrollPos
    ? (navbar.style.top = "0")
    : (navbar.style.top = "-75px");

  prevScrollpos = currentScrollPos;
};

topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

// CURRENT DATE
const datePlaceholder = document.getElementById("currentDate");
let currentDate = new Date().toLocaleDateString().replaceAll("-", " / ");
datePlaceholder.innerHTML = currentDate;

// FILTERS
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

filters.forEach((filter) => {
  const filterItem = document.createElement("li");
  filterItem.className = "filterItem";
  filtersContainer.appendChild(filterItem);

  // NEXT ADD BUTTONS

  const filterButton = document.createElement("button");
  filterButton.className = "filterButton";
  filterButton.value = filter;
  filterItem.appendChild(filterButton);
  filterButton.innerHTML = filter;
});
