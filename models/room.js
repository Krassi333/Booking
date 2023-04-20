const { Schema, model, Types } = require('mongoose');
const Facility = require('./Facility');

const roomSchema = new Schema({
    "city": { type: String, require: true },
    "name": { type: String, require: true },
    "beds": { type: Number, require: true, min: 1 },
    "description": { type: String, require: true },
    "price": { type: Number, require: true, min: 0.01 },
    "imageUrl": { type: String },
    facilities: { type: [Types.ObjectId], default: [], ref: 'Facility' }
});

const Room = model('Room', roomSchema);

module.exports = Room;