
const fs = require('fs');

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

function getAll(search, city, fromPrice, toPrice) {
    return data.filter(x => x.name.includes(search))
        //.filter(x => x.city.includes(city))
        //.filter(x => x.price <= fromPrice && x.price >= toPrice);


}

function getById(id) {
    return data.find(x => x.id == id);
}

function getId() {
    return (Math.random() * 99999).toString(16).slice(-6);
}

async function create(room) {
    const roomData = {
        id: getId(),
        "city": room.city,
        "name": room.name,
        "beds": Number(room.beds),
        "description": room.description,
        "price": Number(room.price),
        "imageUrl": room.imgUrl
    };

    data.push(roomData);
    await persist();
}

module.exports = {
    getAll,
    getById,
    create
}