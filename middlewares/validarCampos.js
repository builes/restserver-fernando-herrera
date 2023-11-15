const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  // check if there are errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // next quiere decir que si todo sale bien, se ejecutara el siguiente middleware
  // o el controlador
  next();
};

module.exports = {
  validarCampos,
};
