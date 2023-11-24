const Category = require("../models/categoryModel");

// getCategories - pagination - total - populate
const getCategories = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "nombre correo"),
    //"user" es el nombre del campo en tu documento Category
    // que hace referencia a un documento de la colección User
    // el segundo argumento es para especificar los campos que quieres mostrar
    // si no lo especificas, te mostrará todos los campos del documento
    // se deben poer los nombres como estan en el modelo User
  ]);

  return res.status(200).json({
    total,
    categories,
  });
};

// getcategoryById - populate
const getcategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate(
    "user",
    "nombre correo"
  );

  return res.status(200).json({
    category,
  });
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  //   let's look for the category in the database
  const categoryDB = await Category.findOne({ name });

  //   if the category already exists, we return an error
  if (categoryDB) {
    return res.status(400).json({
      ok: false,
      msg: `The category ${categoryDB.name} already exists`,
    });
  }

  //generate the data to save, we must add the user id
  const data = {
    name,
    user: req.uid,
  };

  //create the category
  const category = new Category(data);

  //save the category in the database
  await category.save();

  return res.status(200).json({
    category,
  });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;

  // like this we avoid that can modify the status and the user
  const { status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();

  data.user = req.uid;

  // update the category in the database
  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("user", "nombre correo");

  return res.status(200).json({
    category,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  //   //   delete the category from the database
  const category = await Category.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );

  return res.status(200).json({
    category,
  });
};

module.exports = {
  getCategories,
  getcategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
