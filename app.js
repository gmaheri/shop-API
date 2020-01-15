const express = require('express');
const app = express();

const routerProducts = require('./api/routes/products')
const routerOrder = require('./api/routes/orders')

const port = process.env.PORT || 3000;

app.use('/products', routerProducts);
app.use('/orders', routerOrder);

app.listen(port, ()=> {
  console.log(`Server is up and running on port: ${port}`)
});
