const config = {
  // rootMargin: "50px 20px 75px 30px",
  threshold: [0.5],
};

function articleObserver(items) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("in the view");
        entry.target.classList.remove("invisible");
        entry.target.classList.add("visible");
        // STOP OBSERVING
        // observer.unobserve(entry.target);
      } else {
        console.log("out of view");
        entry.target.classList.remove("visible");
        entry.target.classList.add("invisible");
      }
    });
  }, config);

  items.forEach((i) => {
    observer.observe(i);
  });
}

export { articleObserver };
