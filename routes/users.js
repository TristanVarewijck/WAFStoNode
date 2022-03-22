var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/articles/:id", function (req, res, next) {
  res.send(req.params.id);

  res.render("users");
});

module.exports = router;
