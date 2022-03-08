const textInput = document.querySelector("#speechForm p");
const mains = document.querySelectorAll("main");
let synth = window.speechSynthesis;

const routing = (articles) => {
  const detailContentContainer = document.querySelector(
    "main:nth-of-type(2) section article"
  );
  routie({
    "article/:id": (id) => {
      console.log(id);
      let detailArticle = articles.filter((item) => `${item.id}` === id);
      console.log(detailArticle);

      while (detailContentContainer.firstChild) {
        detailContentContainer.removeChild(detailContentContainer.firstChild);
      }

      detailArticle.forEach((item) => {
        const template = ` 
          <div class="bgImage" style="background-image:url(${
            item.urlToImage ? item.urlToImage : "./assets/icons/no-image.svg"
          })"></div>
          <h2>
            ${item.title}
          </h2>
  
          <div>
            <small><i class="fa-solid fa-file-signature"></i>${
              item.author
            }</small>
            <div>
              <button form="speechForm" type="submit">
                <i class="fa-solid fa-headphones"></i>
              </button>
  
              <button class="hidden" type="button">
                <!-- default state is "hidden"-->
                <i class="fa-solid fa-stop"></i>
              </button>
            </div>
            <small><i class="fa-solid fa-file-signature"></i> ${
              item.author ? item.author : "-"
            }</small>
          </div>`;

        const detailSection = document.createElement("article");
        detailSection.innerHTML = template;
        detailContentContainer.appendChild(detailSection);
        textInput.innerHTML = item.content;
      });
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
