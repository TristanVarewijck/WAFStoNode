var express = require("express");
var router = express.Router();
const axios = require("axios").default;
const cleanData = require("../data/cleanData");
require("dotenv").config();
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}
let currentDate = new Date().toLocaleDateString().replaceAll("-", " / ");

/* HOME PAGE. */
router.get("/", async (req, res) => {
  let searchValue;
  await axios({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=50&apiKey=${process.env.API_KEY}`,
  })
    .then((response) => cleanData.cleanData(response))
    .then((cleanedData) => {
      res.render("index", {
        title: "TechDefined",
        cleanedData: cleanedData,
        searchValue: searchValue,
        currentDate: currentDate,
      });

      console.log(currentDate);
      const jsonArr = JSON.stringify(cleanedData);
      localStorage.setItem("data", jsonArr);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// SEARCH ITEM
// should be a get request but i used post -_-
router.post("/", async (req, res) => {
  let searchValue = req.body.input;
  await axios({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=${searchValue}&sortBy=publishedAt&language=en&pageSize=50&apiKey=${process.env.API_KEY}`,
  })
    .then((response) => cleanData.cleanData(response))
    .then((cleanedData) => {
      res.render("index", {
        title: "TechDefined",
        searchResults: cleanedData,
        searchValue: searchValue,
        currentDate: currentDate,
      });
      const jsonArr = JSON.stringify(cleanedData);
      localStorage.setItem("data", jsonArr);
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
