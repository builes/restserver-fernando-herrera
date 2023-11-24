const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const router = express.Router();

const {
  exixtProductById,
  exixtCategoryById,
} = require("../helpers/dbValidators");
const { check } = require("express-validator");

const { validarCampos, validarJwt, esAdminRole } = require("../middlewares");

router.get("/", getProducts);

router.get(
  "/:id",
  [
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(exixtProductById),
    validarCampos,
  ],
  getProductById
);

router.post(
  "/",
  [
    validarJwt,
    check("name", "Name is required").not().isEmpty(),
    check("category", "Invalid ID").isMongoId(),
    check("category").custom(exixtCategoryById),
    validarCampos,
  ],
  createProduct
);

router.put(
  "/:id",
  [
    validarJwt,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(exixtProductById),
    validarCampos,
  ],
  updateProduct
);

router.delete(
  "/:id",
  [
    validarJwt,
    esAdminRole,
    check("id", "Invalid ID").isMongoId(),
    check("id").custom(exixtProductById),
    validarCampos,
  ],
  deleteProduct
);

module.exports = router;
