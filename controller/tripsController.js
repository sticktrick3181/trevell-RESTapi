const Trips = require('../models/tripsModel');
//1.GET
const getTrips = async function (req, res) {
  try {
    const trips = await Trips.find();
    res.json({
      trips
    });
  } catch (err) {
    console.log(err);
  }
};

//2. GET SINGLE TRIP
const getTrip = async function (req, res) {
  try {
    const id = req.params.id;
    const trip = await Trips.findById(id);
    res.json({
      trip
    });
  } catch (err) {
    res.json({
      message: 'Check ID again',
      error: err
    });
  }
};

//3. POST
const addTrip = async function (req, res) {
  try {
    const tripToAdd = await Trips.create(req.body);
    tripToAdd.save();
    res.json({
      message: 'added',
      trip: tripToAdd
    });
  } catch (err) {
    res.json({
      err
    });
  }
};
const deleteATrip = async function (req, res) {
  try {
    const trip = await Trips.findById(req.params.id);
    trip.remove();
    res.json('deleted');
  } catch (err) {
    res.json({
      message: "Couldn't delete"
    });
  }
};
module.exports = {
  getTrips,
  getTrip,
  addTrip,
  deleteATrip
};
