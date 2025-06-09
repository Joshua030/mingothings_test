const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config({ path: './config.env' });
const app     = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATA_PASSWORD
);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);



// Uncaught exceptions
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION! 💥', err);
  server.close(() => process.exit(1));
});

// Unhandled promise rejections
process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION! 💥', err);
  server.close(() => process.exit(1));
});