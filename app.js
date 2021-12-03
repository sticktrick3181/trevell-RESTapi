const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const morgan = require('morgan');

const tripRouter = require('./routes/tripRoutes');
const userRouter = require('./routes/userRoutes');
const { connectToDB } = require('./data/databaseconnection');
app.listen(port, () => {
  console.log('Server created');
});
connectToDB();
app.use(morgan('dev'));
// middleware to get req.body while POST request
app.use(express.json());
app.use(express.urlencoded());
app.use('/trevell/api/v1/trips', tripRouter);
app.use('/trevell/api/v1/users', userRouter);

// app.route('/trevell/api/v1/trips').get(tripRouter);
// app.route('/trevell/api/v1/users').get((req, res) => {
//   res.json(' users Working');
// });
