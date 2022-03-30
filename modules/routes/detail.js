var express = require("express");
var router = express.Router();
/* GET users listing. */
router.get("/articles/:id", async (req, res) => {
  let { id } = req.params;
  let existing = JSON.parse(localStorage.getItem("data"));
  let detailItem = existing.find((i) => i.id === id);

  res.render("detail", { detailItem });
});

module.exports = router;
