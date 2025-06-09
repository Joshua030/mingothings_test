const mongoose = require('mongoose');

const refrigerantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Refrigerant name is required'],
    unique: true
  },
  ptFactor: {
    type: Number,
    default: 1.5,
    required: true
  },
  ptOffset: {
    type: Number,
    default: 20,
    required: true
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Refrigerant = mongoose.model('Refrigerant', refrigerantSchema);
module.exports = Refrigerant;
