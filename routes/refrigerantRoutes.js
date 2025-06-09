const express = require('express');
const refrigerantController = require('../controllers/refrigerantController');

const router = express.Router();

router
  .route('/')
  .get(refrigerantController.getAllRefrigerants)
  .post(refrigerantController.createRefrigerant);

module.exports = router;
