const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    msg: 'Placed an order'
  });
});

router.get('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({
    msgs:  `Here is the Order you had placed: ${id}`
  });
});

router.patch('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({
    msg:  `You have UPDATED order: ${id}`
  });
});

router.delete('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  res.status(200).json({
    msg:  `You have DELETED order: ${id}`
  });
});

module.exports = router;


