const mongoose = require('mongoose');
const Refrigerant = require('./refrigerantModel');

// ───── TELEMETRY SCHEMA ─────
const telemetrySchema = new mongoose.Schema({
  createdAt:      { type: Date, default: Date.now },
  lowPressure:    { type: Number, required: true },
  suctionTemp:    { type: Number, required: true },
  highPressure:   { type: Number, required: true },
  liquidPressure: { type: Number },
  liquidTemp:     { type: Number },
  lowTemp:        { type: Number },
  highTemp:       { type: Number },

  // Computed values
  superheat:      { type: Number },
  subcool:        { type: Number }
}, { _id: false,  timestamps: true  });


// ───── MAIN REFRIGERATOR SCHEMA ─────
const refrigeratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A refrigerator must have a name']
  },
  refrigerantType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Refrigerant',
    required: [true, 'A refrigerant reference is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Refrigerator capacity is required']
  },
  telemetry: [telemetrySchema]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


// ───── PRE-SAVE MIDDLEWARE ─────
refrigeratorSchema.pre('save', async function (next) {
  const last = this.telemetry[this.telemetry.length - 1];
  if (!last) return next();

  const refrigerant = await Refrigerant.findById(this.refrigerantType);
  if (!refrigerant) return next(new Error('Refrigerant not found'));

  // Simple P-T approximation using factor + offset
  const ptChart = (pressure) => refrigerant.ptFactor * pressure + refrigerant.ptOffset;

  // Superheat = suctionTemp - saturationTemp
  if (last.lowPressure && last.suctionTemp) {
    const satTemp = ptChart(last.lowPressure);
    last.superheat = parseFloat((last.suctionTemp - satTemp).toFixed(2));
  }

  // Subcool = saturationTemp - liquidTemp
  if (last.liquidPressure != null && last.liquidTemp != null) {
    const condSatTemp = ptChart(last.liquidPressure);
    last.subcool = parseFloat((condSatTemp - last.liquidTemp).toFixed(2));
  }

  next();
});

const Refrigerator = mongoose.model('Refrigerator', refrigeratorSchema);
module.exports = Refrigerator;
