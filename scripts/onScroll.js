const mybutton = document.querySelector("body > button");
const navbar = document.querySelectorAll("nav");
let prevScrollpos = window.scrollY;

function onScroll() {
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
}

export { onScroll };
