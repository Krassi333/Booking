const Room=require('../models/Room');
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



async function create(room) {
    const roomData = {
        "city": room.city,
        "name": room.name,
        "beds": Number(room.beds),
        "description": room.description,
        "price": Number(room.price),
        "imageUrl": room.imgUrl
    };

    const result=await Room.create(roomData);
   return result;
}


module.exports = {
    getAll,
    getById,
    create
}