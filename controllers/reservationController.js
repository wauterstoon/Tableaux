const Reservation = require('../models/reservation');

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    partySize: req.body.partySize,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    notes: req.body.notes
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    reservation.name = req.body.name || reservation.name;
    reservation.date = req.body.date || reservation.date;
    reservation.time = req.body.time || reservation.time;
    reservation.partySize = req.body.partySize || reservation.partySize;
    reservation.phoneNumber = req.body.phoneNumber || reservation.phoneNumber;
    reservation.email = req.body.email || reservation.email;
    reservation.notes = req.body.notes || reservation.notes;

    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    await reservation.remove();
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
