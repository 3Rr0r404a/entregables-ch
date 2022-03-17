const express = require('express');
const { Router } = express;
const ProductosRouter = Router();

let productos = [];

const findProducto = (id) => {
  return productos.filter(item => item.id === parseInt(id));
}


ProductosRouter.get('/', (req, res) => {
  // res.json(productos);
  res.render('products', { products: productos });
})

ProductosRouter.get('/:id', (req, res) => {
  const prod = findProducto(req.params.id);
  if (prod.length === 0) {
    res.json({ error: 'Producto no encontrado' })
  }
  res.json(prod[0]);
})

ProductosRouter.post('/', (req, res) => {
  const prod = req.body;
  prod.id = productos.length + 1;
  productos.push(prod);
  //res.json({ mensaje: 'Producto creado' });
  res.redirect('/');
})

ProductosRouter.put('/:id', (req, res) => {
  const [prod] = findProducto(req.params.id);
  if (prod.length === 0) {
    res.json({ error: 'Producto no encontrado' })
  }
  productos = productos.map(item => {
    if (prod.id === item.id) {
      item.title = req.body.title;
      item.price = req.body.price;
      item.thumbnail = req.body.thumbnail;
    }
    return item;
  });
  res.json({ mensaje: `Producto ${prod.id} actualizado` });
})

ProductosRouter.delete('/:id', (req, res) => {
  const prod = findProducto(req.params.id);
  if (prod.length === 0) {
    res.json({ error: 'Producto no encontrado' })
  }
  productos = productos.filter(item => item.id !== id)
  res.json({ mensaje: `Producto ${prod[0].id} eliminado` });
})

module.exports = ProductosRouter;