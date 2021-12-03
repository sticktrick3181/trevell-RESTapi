const express = require('express');

const router = express.Router();
const {
  getTrips,
  getTrip,
  addTrip,
  deleteATrip
} = require('../controller/tripsController');
const { userStatus } = require('./userRoutes');

router.route('/').get(getTrips).post(addTrip);

router.route('/:id').get(getTrip).delete(deleteATrip);

module.exports = router;
