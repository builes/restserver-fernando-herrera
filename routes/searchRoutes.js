const express = require("express");
const { search } = require("../controllers/searchControllers");
const router = express.Router();

router.get("/:collection/:term", search);

module.exports = router;
