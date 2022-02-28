document.addEventListener("scroll", scanDocument);

function isVisible(element) {
  let elementBox = element.getBoundingClientRect();
  let distanceFromTop = -100;

  if (elementBox.top - window.innerHeight < distanceFromTop) {
    return true;
  } else {
    return false;
  }
}

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
