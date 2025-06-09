const Refrigerant = require('../models/refrigerantModel');
const catchAsync = require('../utils/catchAsync');

// GET /api/refrigerants
exports.getAllRefrigerants = catchAsync(async (req, res, next) => {
  const refrigerants = await Refrigerant.find();
  res.status(200).json({
    status: 'success',
    results: refrigerants.length,
    data: refrigerants
  });
});

// POST /api/refrigerants
exports.createRefrigerant = catchAsync(async (req, res, next) => {
  const newRefrigerant = await Refrigerant.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newRefrigerant
  });
});
