const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos');
const handlebars = require('express-handlebars');
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  'hbs',
  handlebars({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutDir: __dirname + "/views/layouts",
    partialDir: __dirname + "/views/partials"
  })
);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('main');
});

app.use('/api/productos', productosRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})

server.on("error", error => console.log(`Error in server ${error}`));