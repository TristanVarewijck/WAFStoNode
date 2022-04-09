var express = require("express");
var router = express.Router();

router.get("/articles/:id", async (req, res) => {
  let { id } = req.params;
  let existing = JSON.parse(localStorage.getItem("data"));
  console.log(existing);
  let detailItem = existing.find((i) => i.id === id);
  res.render("detail", {
    detailItem: detailItem,
  });
});

module.exports = router;
