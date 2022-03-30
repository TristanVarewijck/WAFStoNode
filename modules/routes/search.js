var express = require("express");
var router = express.Router();
const axios = require("axios").default;
const cleanData = require("../data/cleanData");
require("dotenv").config();
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

/* GET home page. */
router.get("/", async (req, res) => {
  await axios({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${process.env.API_KEY}`,
  })
    .then((response) => cleanData.cleanData(response))
    .then((cleanedData) => {
      res.render("index", {
        cleanedData: cleanedData,
        title: "TechDefined",
      });
      const jsonArr = JSON.stringify(cleanedData);
      localStorage.setItem("data", jsonArr);
    })
    .catch(function (err) {
      console.log(err);
    });
});
