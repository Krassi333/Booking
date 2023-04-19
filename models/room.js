const { Schema, model } = require('mongoose');

const roomSchema = new Schema({
    "city": { type: String, require: true },
    "name": { type: String, require: true },
    "beds": { type: Number, require: true, min: 1 },
    "description": { type: String, require: true },
    "price": { type: Number, require: true, min: 0.01 },
    "imageUrl": { type: String }
});

const Room = model('Room', roomSchema);

module.exports = Room;