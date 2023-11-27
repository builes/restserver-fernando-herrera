const express = require("express");
const router = express.Router();
const {
  uploadFile,
  updateImageCloudinary,
  showImage,
} = require("../controllers/uploadControllers");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares");
const { allowedCollections } = require("../helpers/dbValidators");
const { validateFile } = require("../middlewares/validateFile");

router.post("/", uploadFile);

router.put(
  "/:collection/:id",
  [
    check("id", "ID is not valid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validateFile,
    validarCampos,
  ],
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("id", "ID is not valid").isMongoId(),
    check("collection").custom((c) =>
      allowedCollections(c, ["users", "products"])
    ),
    validarCampos,
  ],
  showImage
);

module.exports = router;
