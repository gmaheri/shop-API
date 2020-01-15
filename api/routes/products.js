const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products');

router.get('/', (req, res, next) => {
 Product.find().
 exec()
 .then(docs => {
   console.log(docs);
   res.status(200).json(docs);
 })
 .catch(err => {
   console.log(err);
   res.status(500).json({message : err})
 })
});

router.post('/', (req, res, next) => {
   const product = new Product({
     _id : mongoose.Types.ObjectId(),
     name : req.body.name,
     price : req.body.price
   });

   product.save().then(result => {
     console.log(result)
   }). catch(err => console.log(err))

  res.status(201).json({
    message : 'Product added Succesfully!',
    createdProduct: product
  })
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;
  Product.findById(id)
  .exec()
  .then(doc => {
    console.log('From Database ',doc);
    if(doc) {
      res.status(200).json(doc)
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
  .exec()
  .then(result => {
    res.status(200).json({
      message : 'Record updated Successfully!'
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
    res.status(200).json(results)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error : err})
  })
});


module.exports = router;
