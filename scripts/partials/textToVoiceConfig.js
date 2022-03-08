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

export { synth, speechSettings, SpeechSynthesisUtterance, textInput };
