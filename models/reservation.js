const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  notes: { type: String }
}, {
  timestamps: true,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
