const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


// Create a new device
exports.createThing = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: 'success',
    data:   'Device created'
  });
})

// GET /api/things/:thing_id
exports.getThing = catchAsync(async (req, res, next) => {
  res.status(200).json({ status: 'success', data: 'Measure get' });
});

// POST /api/things/:thing_id
exports.postTelemetry = catchAsync(async (req, res, next) => {
  res.status(201).json({ status: 'success', data: 'Meeasured added' });
});

// GET /api/things/:thing_id/:variable
exports.getHistorical = catchAsync(async (req, res, next) => {
  const { thing_id, variable } = req.params;
  if (!thing_id) return next(new AppError('No device found with that ID', 404));

  res.status(200).json({ status: 'success', data: 'history get '});
});
