const { generarJWT } = require("../helpers/generarJWT");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { correo, password } = req.body;
  try {
    // verify if user exists
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // verify if user is active
    if (!user.estado) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    // verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // if the user exists and the password is correct then generate JWT
    const token = await generarJWT(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  loginUser,
};
