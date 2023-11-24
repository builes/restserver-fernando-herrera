require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
    };

    // Conectar a base de datos
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // accedo a las rutas
    this.routes();
  }

  async dbConnection() {
    try {
      await connectDB();
    } catch (error) {
      console.log(error);
      throw new Error("Error connecting to database");
    }
  }

  middlewares() {
    // Lectura y parseo del body
    this.app.use(express.json());

    // CORS
    this.app.use(cors());

    // Accedmos a la carpeta publica de manera estatica
    this.app.use(express.static("public"));
  }

  // Rutas de mi aplicación
  routes() {
    this.app.use(this.paths.auth, require("../routes/authRoutes"));
    this.app.use(this.paths.users, require("../routes/userRoutes"));
    this.app.use(this.paths.categories, require("../routes/categoryRoutes"));
    this.app.use(this.paths.products, require("../routes/productRoutes"));
    this.app.use(this.paths.search, require("../routes/searchRoutes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando puerto: ", this.port);
    });
  }
}

module.exports = Server;
