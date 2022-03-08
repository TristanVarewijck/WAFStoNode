// imports
import { addFilters } from "./filterButtons.js";
import { parseDate } from "./parseCurrentDate.js";
import { scrollToTop } from "./toTopButton.js";
import { onScroll } from "./onScroll.js";
import { getData } from "./data/fetch.js";

const mybutton = document.querySelector("body > button");
mybutton.addEventListener("click", scrollToTop); // to top button call

const speechForm = document.getElementById("speechForm"),
  textInput = document.querySelector("#speechForm p"),
  speakButton = document.querySelector(
    "main:nth-of-type(2) button:first-of-type"
  ),
  cancelButton = document.querySelector(
    "main:nth-of-type(2) button:last-of-type"
  );
let synth = window.speechSynthesis;

// GET SPEECH API
const speechSettings = {
  lang: "en-GB",
  pitch: 1,
  rate: 1.05,
  volume: 0.7,
};
// browsers
const SpeechSynthesisUtterance =
  window.webkitSpeechSynthesisUtterance ||
  window.mozSpeechSynthesisUtterance ||
  window.msSpeechSynthesisUtterance ||
  window.oSpeechSynthesisUtterance ||
  window.SpeechSynthesisUtterance;

// GET DATA
getData();

window.onload = getData();

window.onscroll = () => {
  onScroll();
};

// Scroll top top behaviour
scrollToTop();

// Current date
parseDate();

// Call filters
addFilters();

// // check browser support
// SpeechSynthesisUtterance !== undefined
//   ? console.log("supported")
//   : console.log("not supported");
// // text input

// speechForm.onsubmit = function (event) {
//   event.preventDefault();

//   cancelButton.addEventListener("click", function () {
//     synth.cancel();
//   });

//   // text to speak >> textInput (new utterance of nieuwe uiting)
//   let utterance = new SpeechSynthesisUtterance(textInput.innerHTML);
//   // voice settings
//   utterance.lang = speechSettings.lang;
//   utterance.pitch = speechSettings.pitch;
//   utterance.rate = speechSettings.rate;
//   utterance.volume = speechSettings.volume;
//   // actually speak the utterance
//   synth.speak(utterance);

//   // add class when speaking
//   utterance.addEventListener("start", function () {
//     speakButton.classList.add("speaking");
//     cancelButton.classList.remove("hidden");
//   });

//   // remove class when speaking
//   utterance.addEventListener("end", function () {
//     speakButton.classList.remove("speaking");
//     cancelButton.classList.add("hidden");
//   });
// };

// onScroll();
// onScroll behaviours
