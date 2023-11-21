const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    nombre: {
      type: String,
      // the second element of the array is the error message
      required: [true, "El nombre es obligatorio"],
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: true,

      // enum only allows the values specified in the array
      enum: ["ADMIN_ROLE", "USER_ROLE"],
    },

    estado: {
      type: Boolean,
      default: true,
    },

    google: {
      type: Boolean,
      default: false,
    },
  },
  // this object is for the virtuals
  {
    versionKey: false,
  }
);

// this must be a normal function, because we need to use the this keyword
// this function is called when we return the user object
UserSchema.methods.toJSON = function () {
  // this.toObject() create a instance of the model

  // we extract the password  object
  const { password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

// Mongoose change the name of the collection to plural and lowercase, users
module.exports = model("User", UserSchema);
