const { check } = require("express-validator");
const express = require("express");
const router = express.Router();
const {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
} = require("../controllers/userControllers");
const {
  isValidaRole,
  existEmail,
  exixtUSerById,
} = require("../helpers/dbValidators");

// middlewares
const { validarCampos, validarJwt, esAdminRole } = require("../middlewares");

router.get("/", getUsers);

router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check("password", "el password debe tener mas de 6 caracteres").isLength({
      min: 6,
    }),
    check("correo", "el correo no es valido").isEmail(),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("correo").custom(existEmail),
    check("rol").custom(isValidaRole),
    validarCampos,
  ],
  postUsers
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(exixtUSerById),
    // if rol is not sent, the middleware will not validate it
    check("rol").optional().custom(isValidaRole),

    validarCampos,
  ],
  putUsers
);

router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(exixtUSerById),
    validarCampos,
  ],
  deleteUsers
);

module.exports = router;
