const validarCampos = require("../middlewares/validarCampos");
const validarJwt = require("../middlewares/validateJWT");
const esAdminRole = require("../middlewares/validateRole");

module.exports = {
  ...validarCampos,
  ...validarJwt,
  ...esAdminRole,
};
