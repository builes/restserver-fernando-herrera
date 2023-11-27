const { v4: uuidv4 } = require("uuid");
const path = require("path");

const uploadFileToServer = async (
  fileToUpload,
  allowedExtensions = [],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const file = fileToUpload;

    const extension = file.name.split(".").slice(-1).join("");

    allowedExtensions = ["png", "jpg", "jpeg", "gif"];

    // validate extension
    if (!allowedExtensions.includes(extension)) {
      return reject(
        `The extension ${extension} is not allowed, please use ${allowedExtensions.join(
          ", "
        )}`
      );
    }

    //rename file
    const fileName = `${uuidv4()}.${extension}`;

    // __dirname refers to the current directory
    const uploadPath = path.join(__dirname, "../uploads/", folder, fileName);

    // this function is respponsible of uploading the file to the path
    file.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(fileName);
    });
  });
};

module.exports = {
  uploadFileToServer,
};
