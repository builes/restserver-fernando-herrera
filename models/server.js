require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

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
    this.app.use(this.usersPath, require("../routes/userRoutes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Escuchando puerto: ", this.port);
    });
  }
}

module.exports = Server;
