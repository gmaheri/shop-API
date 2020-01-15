const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.status(200).json({
    message : 'handling GET requests to /products'
  })
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message : 'handling POST requests to /products'
  })
});

router.get('/:productID', (req, res, next) => {
  const id = req.params.productID;
  if(id === 'special'){
    res.status(200).json({
      message: 'you entered the special ID',
      productID : id
    });
  } else {
    res.status(200).json({
      message: 'You passed an ID',
      productID : id
    });
  }
});

router.patch('/:productID', (req, res, next) => {
  res.status(200).json({
    msgs: 'UPDATED a product'
  });
});

router.delete('/:productID', (req, res, next) => {
  res.status(200).json({
    msgs: 'DELETED a product'
  });
});


module.exports = router;
