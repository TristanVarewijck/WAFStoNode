var express = require("express");
var router = express.Router();
const axios = require("axios").default;
require("dotenv").config();

/* GET home page. */
router.get("/", async (req, res) => {
  await axios({
    method: "GET",
    url: `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${process.env.API_KEY}`,
  })
    // Handles the response and returns the data
    .then(function (response) {
      let data = response.data.articles;
      return data;
    })
    // saves the data to a variable for later use
    .then(function (data) {
      apiData = data;
      console.log(apiData);
    })
    // error if error
    .catch(function (err) {
      console.log(err);
    });

  res.render("index", { apiData });
});
//   axios
//     .get(
//       `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=100&apiKey=${process.env.API_KEY}`
//     )
//     .then(function (response) {
//       // handle success
//       let articles = response.data.articles;
//       return articles;
//     })
//     .then(function (articles) {
//       articles
//         .map((article) => {
//           // Function
//           let publishedAt = new Date(article.publishedAt);
//           publishedAt = publishedAt.toString().substring(3, 25);
//           publishedAt = publishedAt.slice(12, 16) + publishedAt.slice(16);

//           for (let i = 0; i < articles.length; i++) {
//             articles.forEach((article) => {
//               article.id = i++;
//             });
//           }
//           return articles;
//         })
//         .then(function (articles) {
//           data = articles;
//           console.log(articles);
//         })
//         .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
//   res.render("index", { title: "kaas", data: articles });
// })

module.exports = router;
