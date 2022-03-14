const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos');
const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/productos', productosRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

server.on("error", error => console.log(`Error in server ${error}`));