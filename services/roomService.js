const Room = require('../models/Room');
/*const fs = require('fs');

const fileName = './models/data.json';
const data = JSON.parse(fs.readFileSync(fileName));

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(fileName, JSON.stringify(data), (err) => {
            if (err == null) {
                res();
            } else {
                rej(err);
            }
        });
    });
};
*/

function getAll(search, city, fromPrice, toPrice) {
    return Room.find({}).lean();

}


function getById(id) {
    return Room.findById(id).lean();
}



async function create(room, ownerId) {
    const roomData = {
        "city": room.city,
        "name": room.name,
        "beds": Number(room.beds),
        "description": room.description,
        "price": Number(room.price),
        "imageUrl": room.imageUrl,
        "owner": ownerId
    };

    const result = await Room.create(roomData);
    return result;
}

async function update(roomId, roomData) {
    const room = await Room.findById(roomId);

    room.city = roomData.city;
    room.name = roomData.name;
    room.beds = Number(roomData.beds);
    room.description = roomData.description;
    room.price = Number(roomData.price);
    room.imageUrl = roomData.imageUrl;

    await room.save();

    return room;
}

async function deleteById(roomId){
return Room.findByIdAndRemove(roomId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById
}