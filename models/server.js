require("dotenv").config();
const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // Middlewares
    this.middlewares();

    // accedo a las rutas
    this.routes();
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
