const Contenedor = require('./Contenedor');
const { faker } = require('@faker-js/faker');

(async () => {
  try {
    // it ("Should create a new container");
    const container = new Contenedor('./productos.txt');

    //it ("Should create 10 products");
    for (let i = 1; i <= 100; i++) {
        tmp = await container.save({
          title: faker.word.noun(),
          price: faker.finance.amount(1,10000,2),
          thumbnail: faker.image.image()
      });
    }   
  } catch (error) {
      console.log(error);
  }
})();
