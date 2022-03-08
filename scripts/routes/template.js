import {
  synth,
  speechSettings,
  SpeechSynthesisUtterance,
  textInput,
} from "../partials/textToVoiceConfig.js";

const detailContentContainer = document.querySelector(
  "main:nth-of-type(2) section article"
);

function templateData(id, articles) {
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

    const detailSection = document.createElement("div");
    detailSection.innerHTML = template;
    detailContentContainer.appendChild(detailSection);
    textInput.innerHTML = item.content;

    // speaking event
    const cancelButton = document.querySelector(
      "main[data-route=template] button:last-of-type "
    );

    const speakButton = document.querySelector(
      "main[data-route=template] button:first-of-type "
    );

    speechForm.onsubmit = function speaking(event) {
      event.preventDefault();

      cancelButton.addEventListener("click", function () {
        synth.cancel();
      });

      // text to speak >> textInput (new utterance of nieuwe uiting)
      let utterance = new SpeechSynthesisUtterance(textInput.innerHTML);
      // voice settings
      utterance.lang = speechSettings.lang;
      utterance.pitch = speechSettings.pitch;
      utterance.rate = speechSettings.rate;
      utterance.volume = speechSettings.volume;
      // actually speak the utterance
      synth.speak(utterance);

      // add class when speaking
      utterance.addEventListener("start", function () {
        speakButton.classList.add("speaking");
        cancelButton.classList.remove("hidden");
      });

      // remove class when speaking
      utterance.addEventListener("end", function () {
        speakButton.classList.remove("speaking");
        cancelButton.classList.add("hidden");
      });
    };
  });
}

export { templateData };
