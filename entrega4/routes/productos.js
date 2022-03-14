const express = require('express');
const { Router } = express;
const ProductosRouter = Router();

let productos = [];

const findProducto = (id) => {
  return productos.filter(item => item.id === parseInt(id));
}


ProductosRouter.get('/', (req, res) => {
  res.json(productos);
})

ProductosRouter.get('/:id', (req, res) => { 
  const prod = findProducto(req.params.id);
  if (prod.length === 0) {
    res.json({error: 'Producto no encontrado'})
  }
  res.json(prod[0]);
})

ProductosRouter.post('/', (req, res) => {
  const prod = req.body;
  prod.id = productos.length + 1;
  productos.push(prod);
  console.log(prod)
  res.json({mensaje: 'Producto creado'})
})

ProductosRouter.put('/:id', (req, res) => {
  const prod = findProducto(req.params.id);
  if (prod.length === 0) {
    res.json({error: 'Producto no encontrado'})
  }
  productos = productos.map(item => {
    if(prod[0].id === item.id) {
      item.title = req.title;
      item.price = req.price;
      item.thumbnail = req.thumbnail;
    }
  });
  res.json({mensaje: `Producto ${prod[0].id} actualizado`});  
})

ProductosRouter.delete('/:id', (req, res) => {
  const prod = findProducto(req.params.id);
  if (prod.length === 0) {
    res.json({error: 'Producto no encontrado'})
  }
  productos = productos.filter(item => item.id !== id)
  res.json({mensaje: `Producto ${prod[0].id} eliminado`});
})

module.exports = ProductosRouter;