const express = require('express');
const thingController = require('../controllers/thingController');

const router = express.Router();


router
  .route('/')
  .get(thingController.getAllThings)
  .post(thingController.createThing)

router
  .route('/:thing_id')
  .get(thingController.getThing)
  .post(thingController.postTelemetry)

router
  .route('/:thing_id/:variable')
  .get(thingController.getHistorical)

module.exports = router;
