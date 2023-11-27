const Role = require("../models/rolModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

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

const exixtCategoryById = async (id) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) {
    throw new Error(`The id: ${id} does not exist`);
  }
};

const exixtProductById = async (id) => {
  const productExists = await Product.findById(id);
  if (!productExists) {
    throw new Error(`The id: ${id} does not exist`);
  }
};

// validate allowed collections
const allowedCollections = (collection = "", collections = []) => {
  const included = collections.includes(collection);
  if (!included) {
    throw new Error(
      `The collection ${collection} is not allowed, ${collections}`
    );
  }
  return true;
};

module.exports = {
  isValidaRole,
  existEmail,
  exixtUSerById,
  exixtCategoryById,
  exixtProductById,
  allowedCollections,
};
