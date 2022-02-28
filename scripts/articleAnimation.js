// const elementBox = document.querySelector("h1");

function isVisible(element) {
  let elementBox = element.getBoundingClientRect();
  let distanceFromTop = -100;

  console.log(elementBox);

  if (elementBox.top - window.innerHeight < distanceFromTop) {
    return true;
  } else {
    return false;
  }
}

document.addEventListener("scroll", scanDocument);
function scanDocument() {
  let allArticles = document.querySelectorAll(
    "#cardsContainer li:not(:first-child)"
  );

  allArticles.forEach(function (article) {
    if (isVisible(article)) {
      article.classList.remove("toTopAnimation");
    }
  });
}

export { scanDocument };
