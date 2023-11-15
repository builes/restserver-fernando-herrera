const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const getUsers = async (req, res) => {
  // de esta manera accedemos a los datos que nos envian como query params
  //   query params son de esta manera: ?nombre=carlos&edad=23
  const { limit = 10, since = 0 } = req.query;

  const query = { estado: true };

  // skip() is used to skip the first n elements
  // limit() is used to limit the number of elements

  // Promise.all() is used to execute multiple promises at the same time
  // and return an array with the results
  // if one of the promises fails, the whole operation fails
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUsers = async (req, res) => {
  // de esta manera accedemos a los datos que nos envian por el body
  const { nombre, correo, password, rol } = req.body;

  // mongoose only takes the fields that are specified in the model
  // this only create the object, but not save it in the database
  const user = new User({
    nombre,
    correo,
    password,
    rol,
  });

  // encrypt the password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  // save the user in the database an return the user only with the fields that we want
  await user.save();

  res.json({
    msg: "post API - controlador",
    user,
  });
};

const putUsers = async (req, res) => {
  // de esta manera accedemos a los datos que nos envian por la url
  // url parameters
  const { id } = req.params;
  const { _id, password, correo, google, ...rest } = req.body;

  if (password) {
    // encrypt the password
    const salt = bcryptjs.genSaltSync(10);
    rest.password = bcryptjs.hashSync(password, salt);
  }

  // { new: true } return the new user
  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({
    user,
  });
};

const deleteUsers = async (req, res) => {
  // de esta manera accedemos a los datos que nos envian por la url
  //   url parameters
  const { id } = req.params;

  // delete the user from the database physically
  // const user = await User.findByIdAndDelete(id);

  // delete the user from the database logically
  const user = await User.findByIdAndUpdate(id, { estado: false });

  res.json({
    user,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
