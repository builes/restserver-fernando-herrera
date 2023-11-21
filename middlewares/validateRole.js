const esAdminRole = (req, res, next) => {
  const userAuthenticated = req.userAuthenticated;

  const { rol, nombre } = userAuthenticated;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req, res, next) => {
    const userAuthenticated = req.userAuthenticated;

    if (!roles.includes(userAuthenticated.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
