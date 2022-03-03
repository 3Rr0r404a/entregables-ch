const Contenedor = require('./Contenedor');
const express = require('express');
const app = express();
const PORT = 8080;
let container;

app.get('/productos', (req, res) => {
  container.getAll()
    .then(products => res.status(200).send(products))
    .catch(err => res.status(500).send(err));
})

app.get('/productoRandom', (req, res) => {
  //TODO not hardcode the max number for random and create random as a funtion in utils file
  min = Math.ceil(1);
  max = Math.floor(100);
  let random = Math.floor(Math.random() * (max - min) + min);
  container.getById(random)
    .then(product => res.status(200).send(product))
    .catch(err => res.status(500).send(err));
})

const server = app.listen(PORT, () => {
  container = new Contenedor('./productos.txt');
  console.log(`Server listening on port ${PORT}`);
})

server.on("error", error => console.log(`Error in server ${error}`));