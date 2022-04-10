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
      const jsonArr = JSON.stringify(cleanedData);
      localStorage.setItem("data", jsonArr);

      console.log(cleanedData);
      res.render("index", {
        title: "TechDefined",
        cleanedData: cleanedData,
        searchValue: searchValue,
        currentDate: currentDate,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

// SEARCH ITEM
// should be a get request but i used post -_-
router.get("/search", async (req, res) => {
  let searchValue = req.query.search;
  await axios({
    method: "GET",
    url: `https://newsapi.org/v2/everything?q=${searchValue}&sortBy=publishedAt&language=en&pageSize=50&apiKey=${process.env.API_KEY}`,
  })
    .then((response) => cleanData.cleanData(response))
    .then((cleanedData) => {
      const jsonArr = JSON.stringify(cleanedData);
      localStorage.setItem("data", jsonArr);

      res.render("index", {
        title: "TechDefined",
        searchResults: cleanedData,
        searchValue: searchValue,
        currentDate: currentDate,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
