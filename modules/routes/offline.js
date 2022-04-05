var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/offline", function (req, res, next) {
  res.render("offline", { title: "offline" });
});

module.exports = router;
