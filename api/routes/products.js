const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
 Product
 .find()
 .select('name price _id')
 .exec()
 .then(docs => {
   const response = {
     count : docs.length,
     products :docs.map(doc => {
       return {
         name: doc.name,
         price: doc.price,
         _id : doc._id,
         request : {
           type : "GET",
           request : 'http://localhost:3000/products/'+ doc._id
         }
       }
     })
   };
   res.status(200).json(response);
 })
 .catch(err => {
   console.log(err);
   res.status(500).json({message : err})
 })
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name : req.body.name,
    price : req.body.price
  });

  product
  .save()
  .then( result => {
    console.log(result);
    res.status(201).json({
      message : 'product created succesfully!',
      productCreated: {
        name : result.name,
        price : result.price,
        _id : result._id,
        response : {
          type: 'GET',
          request : 'http://localhost:3000/products/'+ result._id
        }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({Error : err})
  });
});



router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product
  .findById(id)
  .select('name price _id')
  .exec()
  .then(doc => {
    console.log('From Database ',doc);
    if(doc) {
      res.status(200).json({
        product : doc,
        response : {
          type : 'GET',
          desc : 'Get a list of all products in the store',
          url : 'http://localhost:3000/products'
        }

      })
    }
    else{
      res.status(404).json({message : 'No valid entry fo ID provided'})
    }

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error : err})
  })
});

router.patch('/:productID', (req, res, next) => {
  Product.findByIdAndUpdate({_id: req.params.productID}, req.body)
  .select('name price _id')
  .exec()
  .then(result => {
    res.status(200).json({
      message : 'Record updated Successfully!',
      data : result
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  });
});

router.delete('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.remove({_id: id})
  .exec()
  .then(results => {
    console .log(results);
    res.status(200).json({
      message: 'Product deleted succesffuly!',
      request : {
        type : 'POST',
        url : 'http//:localhost:3000/products',
        body : {name : 'String', price : 'Number'}
      }
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error : err})
  })
});


module.exports = router;
