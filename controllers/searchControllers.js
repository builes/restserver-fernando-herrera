const { ObjectId } = require("mongodb");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Role = require("../models/rolModel");

const allowedCollections = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res) => {
  const isMongoId = ObjectId.isValid(term); // true

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  // in case the term is not a valid mongo id we will search by name or email
  const regex = new RegExp(term, "i"); // i is for case insensitive

  // or search by nombre or correo, and the user must be active
  // this search is not case sensitive and returns all the users that match the regex
  const users = await User.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (term = "", res) => {
  const isMongoId = ObjectId.isValid(term); // true

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  // in case the term is not a valid mongo id we will search by name or email
  const regex = new RegExp(term, "i"); // i is for case insensitive

  const categories = await Category.find({
    name: regex,
    status: true,
  });

  res.json({
    results: categories,
  });
};

const searchProducts = async (term = "", res) => {
  const isMongoId = ObjectId.isValid(term); // true

  if (isMongoId) {
    const product = await Product.findById(term);
    return res.json({
      results: product ? [product] : [],
    });
  }

  // in case the term is not a valid mongo id we will search by name or email
  const regex = new RegExp(term, "i"); // i is for case insensitive

  const products = await Product.find({
    name: regex,
    status: true,
  });

  res.json({
    results: products,
  });
};

// collection makes reference to the collection in the database
// term makes reference to the document in the collection
const search = async (req, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Allowed collections are: ${allowedCollections}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "products":
      searchProducts(term, res);
      break;
    case "roles":
      break;
    default:
      return res.status(500).json({
        msg: "I forgot to do this search",
      });
  }

  //   res.json({
  //     msg: "search API - controller",
  //   });
};

module.exports = {
  search,
};
