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
      console.log(articles);
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

// article ROW animation
const heading = document.querySelector("h1");
console.log(heading.getBoundingClientRect());

function isVisible(element) {
  let elementBox = element.getBoundingClientRect();
  let distanceFromTop = -100;

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

// ROUTING.JS install
var Routie = function (w, isModule) {
  var routes = [];
  var map = {};
  var reference = "routie";
  var oldReference = w[reference];

  var Route = function (path, name) {
    this.name = name;
    this.path = path;
    this.keys = [];
    this.fns = [];
    this.params = {};
    this.regex = pathToRegexp(this.path, this.keys, false, false);
  };

  Route.prototype.addHandler = function (fn) {
    this.fns.push(fn);
  };

  Route.prototype.removeHandler = function (fn) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      var f = this.fns[i];
      if (fn == f) {
        this.fns.splice(i, 1);
        return;
      }
    }
  };

  Route.prototype.run = function (params) {
    for (var i = 0, c = this.fns.length; i < c; i++) {
      this.fns[i].apply(this, params);
    }
  };

  Route.prototype.match = function (path, params) {
    var m = this.regex.exec(path);

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = this.keys[i - 1];

      var val = "string" == typeof m[i] ? decodeURIComponent(m[i]) : m[i];

      if (key) {
        this.params[key.name] = val;
      }
      params.push(val);
    }

    return true;
  };

  Route.prototype.toURL = function (params) {
    var path = this.path;
    for (var param in params) {
      path = path.replace("/:" + param, "/" + params[param]);
    }
    path = path.replace(/\/:.*\?/g, "/").replace(/\?/g, "");
    if (path.indexOf(":") != -1) {
      throw new Error("missing parameters for url: " + path);
    }
    return path;
  };

  var pathToRegexp = function (path, keys, sensitive, strict) {
    if (path instanceof RegExp) return path;
    if (path instanceof Array) path = "(" + path.join("|") + ")";
    path = path
      .concat(strict ? "" : "/?")
      .replace(/\/\(/g, "(?:/")
      .replace(/\+/g, "__plus__")
      .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function (
        _,
        slash,
        format,
        key,
        capture,
        optional
      ) {
        keys.push({ name: key, optional: !!optional });
        slash = slash || "";
        return (
          "" +
          (optional ? "" : slash) +
          "(?:" +
          (optional ? slash : "") +
          (format || "") +
          (capture || (format && "([^/.]+?)") || "([^/]+?)") +
          ")" +
          (optional || "")
        );
      })
      .replace(/([\/.])/g, "\\$1")
      .replace(/__plus__/g, "(.+)")
      .replace(/\*/g, "(.*)");
    return new RegExp("^" + path + "$", sensitive ? "" : "i");
  };

  var addHandler = function (path, fn) {
    var s = path.split(" ");
    var name = s.length == 2 ? s[0] : null;
    path = s.length == 2 ? s[1] : s[0];

    if (!map[path]) {
      map[path] = new Route(path, name);
      routes.push(map[path]);
    }
    map[path].addHandler(fn);
  };

  var routie = function (path, fn) {
    if (typeof fn == "function") {
      addHandler(path, fn);
      routie.reload();
    } else if (typeof path == "object") {
      for (var p in path) {
        addHandler(p, path[p]);
      }
      routie.reload();
    } else if (typeof fn === "undefined") {
      routie.navigate(path);
    }
  };

  routie.lookup = function (name, obj) {
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (route.name == name) {
        return route.toURL(obj);
      }
    }
  };

  routie.remove = function (path, fn) {
    var route = map[path];
    if (!route) return;
    route.removeHandler(fn);
  };

  routie.removeAll = function () {
    map = {};
    routes = [];
  };

  routie.navigate = function (path, options) {
    options = options || {};
    var silent = options.silent || false;

    if (silent) {
      removeListener();
    }
    setTimeout(function () {
      window.location.hash = path;

      if (silent) {
        setTimeout(function () {
          addListener();
        }, 1);
      }
    }, 1);
  };

  routie.noConflict = function () {
    w[reference] = oldReference;
    return routie;
  };

  var getHash = function () {
    return window.location.hash.substring(1);
  };

  var checkRoute = function (hash, route) {
    var params = [];
    if (route.match(hash, params)) {
      route.run(params);
      return true;
    }
    return false;
  };

  var hashChanged = (routie.reload = function () {
    var hash = getHash();
    for (var i = 0, c = routes.length; i < c; i++) {
      var route = routes[i];
      if (checkRoute(hash, route)) {
        return;
      }
    }
  });

  var addListener = function () {
    if (w.addEventListener) {
      w.addEventListener("hashchange", hashChanged, false);
    } else {
      w.attachEvent("onhashchange", hashChanged);
    }
  };

  var removeListener = function () {
    if (w.removeEventListener) {
      w.removeEventListener("hashchange", hashChanged);
    } else {
      w.detachEvent("onhashchange", hashChanged);
    }
  };
  addListener();

  if (isModule) {
    return routie;
  } else {
    w[reference] = routie;
  }
};

if (typeof module == "undefined") {
  Routie(window);
} else {
  module.exports = Routie(window, true);
}

// ROUTING
const showTemplate = document.querySelector("main.template");
const hidepages = document.querySelector("main");
// home
routie("", function () {
  showTemplate.style.display = "none";
  hidepages.style.display = "block";
});

// template
routie(":name", function (name) {
  // hide all pa
  hidepages.style.display = "none";
  showTemplate.style.display = "block";
});
// routie("users/bob"); // logs `'bob'`
