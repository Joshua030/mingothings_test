const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const Refrigerator = require('../../models/refrigeratorModel');
const Refrigerant = require('../../models/refrigerantModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATA_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('DB connection successful!');
});

// Load JSON files
const refrigerants = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'refrigerants.json'), 'utf-8')
);

const refrigerators = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'refrigerators.json'), 'utf-8')
);

// Import data
const importData = async () => {
  try {
    await Refrigerant.create(refrigerants);
    const savedRefrigerants = await Refrigerant.find();

    // Replace refrigerator refrigerantType names with corresponding _ids
    const enrichedRefrigerators = refrigerators.map(fridge => {
      const refrigerant = savedRefrigerants.find(r => r.name === fridge.refrigerantType);
      return {
        ...fridge,
        refrigerantType: refrigerant ? refrigerant._id : null
      };
    });

    await Refrigerator.create(enrichedRefrigerators);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

// Delete all data
const deleteData = async () => {
  try {
    await Refrigerator.deleteMany();
    await Refrigerant.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();

console.log('process.argv:', process.argv);
