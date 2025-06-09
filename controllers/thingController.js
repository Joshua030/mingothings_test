const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Refrigerator = require('../models/refrigeratorModel');

// Create a new refrigerator
exports.createThing = catchAsync(async (req, res, next) => {
  const newFridge = await Refrigerator.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newFridge
  });
});

// GET /api/things
exports.getAllThings = catchAsync(async (req, res, next) => {
  const fridges = await Refrigerator.find({}, 'name refrigerantType capacity').populate('refrigerantType', 'name'); ;
  res.status(200).json({
    status: 'success',
    results: fridges.length,
    data: fridges
  });
});


// GET /api/things/:thing_id
exports.getThing = catchAsync(async (req, res, next) => {
  const fridge = await Refrigerator.findById(req.params.thing_id).populate('refrigerantType');
  if (!fridge) return next(new AppError('No device found with that ID', 404));

  res.status(200).json({ status: 'success', data: fridge });
});

// POST /api/things/:thing_id
exports.postTelemetry = catchAsync(async (req, res, next) => {
  const fridge = await Refrigerator.findById(req.params.thing_id);
  if (!fridge) return next(new AppError('No device found with that ID', 404));

  fridge.telemetry.push(req.body);
  await fridge.save();

  res.status(201).json({ status: 'success', message: 'Measurement added', data: fridge.telemetry.at(-1) });
});

// GET /api/things/:thing_id/:variable
exports.getHistorical = catchAsync(async (req, res, next) => {
  const { thing_id, variable } = req.params;
  const year = parseInt(variable);

  if (isNaN(year)) {
    return next(new AppError('Invalid year format in URL', 400));
  }

  const fridge = await Refrigerator.findById(thing_id);
  if (!fridge) return next(new AppError('No device found with that ID', 404));

  // Filter telemetry by year
  const filtered = fridge.telemetry.filter(entry => {
    return new Date(entry.createdAt).getFullYear() === year;
  });

  res.status(200).json({
    status: 'success',
    results: filtered.length,
    data: filtered
  });
});
