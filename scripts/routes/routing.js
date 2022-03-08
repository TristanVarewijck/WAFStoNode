import { templateData } from "./template.js";
const mains = document.querySelectorAll("main");
let synth = window.speechSynthesis;

const routing = (articles) => {
  routie({
    "article/:id": (id) => {
      templateData(id, articles);
      updateUI("template");
    },
    " ": () => {
      updateUI("landing");
      synth.cancel();
    },
    error: () => {
      updateUI("error");
      synth.cancel();
    },
  });
  function updateUI(route) {
    mains.forEach((main) => {
      main.classList.add("disabled");
    });
    let activeMain = document.querySelector(`[data-route=${route}]`);
    activeMain.classList.remove("disabled");
  }
};

export { routing };
