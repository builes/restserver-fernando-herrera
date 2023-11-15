const Role = require("../models/rolModel");
const User = require("../models/userModel");

const isValidaRole = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const existEmail = async (correo = "") => {
  const emailExists = await User.findOne({ correo });
  if (emailExists) {
    throw new Error(`El correo: ${correo} ya se encuentra registrado`);
  }
};

const exixtUSerById = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = {
  isValidaRole,
  existEmail,
  exixtUSerById,
};
