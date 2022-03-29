var express = require("express");
var router = express.Router();
const axios = require("axios").default;
require("dotenv").config();

const cleanData = require("../data/cleanData");
const currentDate = require("../partials/currentDate");

/* GET home page. */
router.get("/", async (req, res) => {
  await axios({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${process.env.API_KEY}`,
  })
    .then((response) => cleanData.cleanData(response))
    .then((cleanedData) => {
      res.render("index", { cleanedData, currentDate });
    })
    .catch(function (err) {
      console.log(err);
    });
});
module.exports = router;
