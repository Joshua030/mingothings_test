const express = require('express');

const thingRouter = require('./routes/thingRoutes');
const refrigerantRouter = require('./routes/refrigerantRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors'); 
const app = express();


// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// 2) ROUTES
app.use('/api/things', thingRouter);
app.use('/api/refrigerants', refrigerantRouter);



// 3) UNHANDLED ROUTES

app.all('/{*any}', (req, res, next) => {
  /*****Test an error */
  console.log('error');

  // const err = new Error(`Can't find ${req.originalUrl} on this server`)
  // err.status = 'fail'
  // err.statusCode = 404
  // next(err)

  /*****Hamdle error wit a class*/
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))

})
//
app.use(globalErrorHandler)

// // Force an uncaught exception after 1 second
// setTimeout(() => {
//   throw new Error('This is an uncaught exception');
// }, 1000);

// // Force an unhandled promise rejection
// Promise.reject(new Error('This is an unhandled rejection'));




module.exports = app;