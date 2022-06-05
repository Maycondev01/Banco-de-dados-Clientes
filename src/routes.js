const express = require('express');
const routes = express.Router();

const ClientesController = require("../Controller/ClientesController")

routes.post("/clientes", ClientesController.store)
routes.get("/clientes", ClientesController.index)
routes.put("/clientes/:id", ClientesController.put)
routes.delete("/clientes/:id", ClientesController.delete)


module.exports = routes;