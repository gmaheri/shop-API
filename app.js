const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const routerProducts = require('./api/routes/products');
const routerOrder = require('./api/routes/orders');

mongoose.connect('mongodb+srv://Greg:' + process.env.MONGO_ATLAS_PW + '@store-qsolc.mongodb.net/myshop?retryWrites=true&w=majority',
{
  useNewUrlParser: true,
  useUnifiedTopology: true

});


const port = process.env.PORT || 3000;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//Routes that handle requests
app.use('/products', routerProducts);
app.use('/orders', routerOrder);

//error handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});

app.listen(port, ()=> {
  console.log(`Server is up and running on port: ${port}`)
});
