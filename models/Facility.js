const { Schema, model, Types: { ObjectId } } = require('mongoose');
const Room = require('./Room');

const facilitySchema = new Schema({
    label: { type: String, require: true },
    iconUrl: { type: String },
    rooms: { type: [ObjectId], default: [] , ref: 'Room'}
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;