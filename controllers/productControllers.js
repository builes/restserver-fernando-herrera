const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

// getProducts - pagination - total - populate
const getProducts = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "nombre correo")
      .populate("category", "name"),
  ]);

  return res.status(200).json({
    total,
    products,
  });
};

// getProductById - populate
const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("user", "name email")
    .populate("category", "name");

  return res.status(200).json({
    product,
  });
};

const createProduct = async (req, res) => {
  const { status, user, category: categoryId, ...body } = req.body;
  const name = body.name.toUpperCase();

  //   let's look for the product in the database
  const productDB = await Product.findOne({ name });

  //   if the product already exists, we return an error
  if (productDB) {
    return res.status(400).json({
      ok: false,
      msg: `The product ${productDB.name} already exists`,
    });
  }

  //   let's look for the category in the database
  const category = await Category.findById(categoryId);

  //  if the category does not exist, we return an error
  if (!category) {
    return res.status(400).json({
      ok: false,
      msg: `The category ${categoryId} does not exist`,
    });
  }

  //generate the data to save, we must add the user id
  const data = {
    ...body,
    name,
    user: req.uid,
    category: categoryId,
  };

  const product = new Product(data);

  //   save in DB
  await product.save();

  return res.status(201).json({
    product,
  });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.uid;

  const product = await Product.findByIdAndUpdate(id, data, { new: true })
    .populate("user", "name email")
    .populate("category", "name");

  return res.status(200).json({
    product,
  });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  return res.status(200).json({
    deletedProduct,
  });
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
