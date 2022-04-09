const mybutton = document.querySelector("body > button");

// to top button behaviour
function onScroll() {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
    ? (mybutton.style.display = "block")
    : (mybutton.style.display = "none");
}

export { onScroll };
