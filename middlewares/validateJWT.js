const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const validarJwt = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const userAuthenticated = await userModel.findById(uid);

    // verify if user exists
    if (!userAuthenticated) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en DB",
      });
    }

    // verify if user is active
    if (!userAuthenticated.estado) {
      return res.status(401).json({
        msg: "Token no valido - usuario con estado: false",
      });
    }

    req.userAuthenticated = userAuthenticated;

    // si en un middleware modificamos el req, desde el siguiente middleware o  desde
    // el controlador, tendremos disponible la modificacion
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJwt,
};
