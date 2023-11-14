const getUsers = (req, res) => {
  // de esta manera accedemos a los datos que nos envian como query params
  //   query params son de esta manera: ?nombre=carlos&edad=23
  const { q, nombre, apiKey } = req.query;

  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apiKey,
  });
};
const postUsers = (req, res) => {
  // de esta manera accedemos a los datos que nos envian por el body
  const { nombre, edad } = req.body;
  res.json({
    msg: "post API - controlador",
    nombre,
    edad,
  });
};

const putUsers = (req, res) => {
  // de esta manera accedemos a los datos que nos envian por la url
  //   url parameters
  const { id } = req.params;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const deleteUsers = (req, res) => {
  // de esta manera accedemos a los datos que nos envian por la url
  //   url parameters
  const { id } = req.params;

  res.json({
    msg: "delete API - controlador",
    id,
  });
};

module.exports = {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
};
