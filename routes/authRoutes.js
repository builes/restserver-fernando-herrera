const express = require("express");
const { loginUser } = require("../controllers/authController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validarCampos");
const router = express.Router();

router.post(
  "/login",
  [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  loginUser
);

module.exports = router;
