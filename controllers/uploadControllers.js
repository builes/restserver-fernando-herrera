const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const User = require("../models/userModel");
const Product = require("../models/productModel");

const { uploadFileToServer } = require("../helpers/uploadFile");

const uploadFile = async (req, res) => {
  const { file } = req.files;

  try {
    // uploadFileToServer is a function that returns a promise
    // so we have to use await to wait for the promise to be resolved
    const path = await uploadFileToServer(file, ["png", "jpg", "jpeg", "gif"]);

    res.json({ path });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

// const updateImage = async (req, res) => {
//   const { collection, id } = req.params;

//   const { file } = req.files;

//   let model = collection === "users" ? User : Product;

//   switch (collection) {
//     case "users":
//       model = await User.findById(id);
//       if (!model) {
//         return res.status(400).json({ msg: "User does not exist" });
//       }

//       break;
//     case "products":
//       model = await Product.findById(id);
//       if (!model) {
//         return res.status(400).json({ msg: "Product does not exist" });
//       }
//       break;
//     default:
//       return res.status(500).json({ msg: "I forgot to validate this" });
//   }

//   try {
//     // delete previous image
//     if (model.img) {
//       const pathImage = path.join(
//         __dirname,
//         "../uploads",
//         collection,
//         model.img
//       );
//       if (fs.existsSync(pathImage)) {
//         fs.unlinkSync(pathImage); // unlinkSync deletes the file
//       }
//     }

//     const nombre = await uploadFileToServer(file, ["png, jpg"], collection);
//     model.img = nombre;

//     await model.save({ new: true });

//     res.json({ model });
//   } catch (error) {
//     error;
//     res.status(400).json({ msg: error });
//   }
// };

const updateImageCloudinary = async (req, res) => {
  const { collection, id } = req.params;

  const { file } = req.files;

  let model = collection === "users" ? User : Product;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({ msg: "User does not exist" });
      }

      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({ msg: "Product does not exist" });
      }
      break;
    default:
      return res.status(500).json({ msg: "I forgot to validate this" });
  }

  try {
    // delete previous image in cloudinary
    if (model.img) {
      const nameWithExtension = model.img.split("/").slice(-1)[0];
      const [public_id] = nameWithExtension.split(".");

      // delete image from cloudinary
      cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = file;

    // upload new image to cloudinary
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save({ new: true });

    res.json({ secure_url });
  } catch (error) {
    error;
    res.status(400).json({ msg: error });
  }
};

const showImage = async (req, res) => {
  const { collection, id } = req.params;

  let model = collection === "users" ? User : Product;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({ msg: "User does not exist" });
      }

      break;
    case "products":
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({ msg: "Product does not exist" });
      }
      break;
    default:
      return res.status(500).json({ msg: "I forgot to validate this" });
  }

  try {
    if (model.img) {
      const pathImage = path.join(
        __dirname,
        "../uploads",
        collection,
        model.img
      );
      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }

    res.status(200).sendFile(path.join(__dirname, "../assets/no-image.jpg"));
  } catch (error) {
    error;
    res.status(400).json({ msg: error });
  }
};

module.exports = {
  uploadFile,
  //   updateImage,
  showImage,
  updateImageCloudinary,
};
