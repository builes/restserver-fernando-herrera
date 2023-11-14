const express = require("express");
const router = express.Router();
const {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
} = require("../controllers/usersControllers");

router.get("/", getUsers);

router.post("/", postUsers);

router.put("/:id", putUsers);

router.delete("/:id", deleteUsers);

module.exports = router;
