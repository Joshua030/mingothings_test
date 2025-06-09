const express = require('express');

const thingRouter = require('./routes/thingRoutes');
const AppError          = require('./utils/appError');
const app = express();


// Middleware to parse JSON requests
app.use(express.json());

// 2) ROUTES
app.use('/api/things', thingRouter);



// 3) UNHANDLED ROUTES
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

// // Force an uncaught exception after 1 second
// setTimeout(() => {
//   throw new Error('This is an uncaught exception');
// }, 1000);

// // Force an unhandled promise rejection
// Promise.reject(new Error('This is an unhandled rejection'));




module.exports = app;