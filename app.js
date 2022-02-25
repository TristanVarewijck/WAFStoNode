const apiKey = "c9269540edae44718bb24d0041c75162";

// LOADING STATE
// selecting loading div
const loader = document.getElementById("loading");

displayLoading = () => {
  loader.classList.add("display");
};

// hiding loading
hideLoading = () => {
  loader.classList.remove("display");
};

const input = document.getElementById("input");
const form = document.getElementById("form");
form.addEventListener("submit", getData);

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

        // MAKE CARD
        articleContents = `
        <img src="${article.urlToImage}" alt="article banner" width="100%" height="auto"></img>

        <div>
          <h2>${article.title}</h2>
            <div>
            <small><i class="fa-solid fa-calendar-days"></i>${publishedAt}</small>
            <small><i class="fa-solid fa-file-signature"></i> ${article.author}</small>
            </div>
        </div>
  `;

        // <div>
        //     <p>${article.content}</p>
        //     <a href="${article.url}"> <span>Source:</span> ${article.url} </a>
        // </div>
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

// display current date

const datePlaceholder = document.getElementById("currentDate");
let currentDate = new Date().toLocaleDateString().replaceAll("-", " / ");
datePlaceholder.innerHTML = currentDate;

// filters

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
  filterButton.className = filter;
  filterItem.appendChild(filterButton);
  filterButton.innerHTML = filter;
});
