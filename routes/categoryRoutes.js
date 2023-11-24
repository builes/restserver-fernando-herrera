const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validarCampos, validarJwt, esAdminRole } = require("../middlewares");

const {
  getCategories,
  getcategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const { exixtCategoryById } = require("../helpers/dbValidators");

// obetener todas las categorias - publico
router.get("/", getCategories);

// obetener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exixtCategoryById),
    validarCampos,
  ],
  getcategoryById
);

// crear categoria - privado - cualquier persona con un token valido
router.post(
  "/",
  [
    validarJwt,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  createCategory
);

// actualizar - privado - cualquier persona con un token valido
router.put(
  "/:id",
  [
    validarJwt,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(exixtCategoryById),
    validarCampos,
  ],
  updateCategory
);

// borrar una categoria - privado - Admin
router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(exixtCategoryById),
    validarCampos,
  ],
  deleteCategory
);

module.exports = router;
