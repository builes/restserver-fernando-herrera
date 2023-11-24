const { Schema, model } = require("mongoose");

const CategorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      unique: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    user: {
      // Relacion con la tabla de usuarios
      type: Schema.Types.ObjectId,
      ref: "User", // The name of the model to use. must be the same name that we use in the model
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Categories", CategorySchema);
