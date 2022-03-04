const config = {
  rootMargin: "50px 20px 75px 30px",
  threshold: [0, 0.25, 0.75, 1],
};

function imageObserver(images) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("in the view");
        entry.target.classList.add("observed");
        // STOP OBSERVING
        // observer.unobserve(entry.target);
      } else {
        console.log("out of view");
        entry.target.classList.remove("observed");
      }
    });
  });

  images.forEach((image) => {
    observer.observe(image);
  }, config);
}

export { imageObserver };
