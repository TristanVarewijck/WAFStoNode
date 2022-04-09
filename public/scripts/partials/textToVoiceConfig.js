// CONFIG
let synth = window.speechSynthesis;
const speechSettings = {
  lang: "en-GB",
  pitch: 1,
  rate: 1.05,
  volume: 0.7,
};
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

const textInput = document.querySelector("#speechForm p");
const cancelButton = document.querySelector(
  "main[data-route=template] button:last-of-type "
);

const speakButton = document.querySelector(
  "main[data-route=template] button:first-of-type "
);

console.log(textInput, cancelButton, speakButton);

// TRIGGER
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
