const validateFile = (req, res, next) => {
  const file = req.files?.file;

  if (!req.files || Object.keys(req.files).length === 0 || !file) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }

  next();
};

module.exports = {
  validateFile,
};
