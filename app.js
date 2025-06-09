const express = require('express');

const thingRouter = require('./routes/thingRoutes');
const AppError          = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const app = express();


// Middleware to parse JSON requests
app.use(express.json());

// 2) ROUTES
app.use('/api/things', thingRouter);



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