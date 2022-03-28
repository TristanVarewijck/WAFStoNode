var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send(req.params.id);

  console.log("detail page");
  res.render("detail");
});

module.exports = router;
