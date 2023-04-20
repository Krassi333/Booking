const Facility = require('../models/Facility');
const Room = require('../models/Room');

async function getAllFacilities() {
    return Facility.find({}).lean();
}

async function createFacility(label, iconUrl) {
    await Facility.create({
        label,
        iconUrl
    })
}

async function addFacilities(roomId, facilityIds) {
    const room = await Room.findById(roomId).populate('facilities');
    const facilities = await Facility.find({ _id: { $in: facilityIds } });

    const toRemove = room.facilities.filter(f => facilities.every(x => x._id.toString() != f._id.toString()));

    toRemove.forEach(f => {
        f.rooms.splice(f.rooms.findIndex(rId => rId.toString() == roomId), 1);
        room.facilities.splice(room.facilities.findIndex(x => x._id.toString() == f._id.toString()))
    });

    const newlyAdded = facilities.filter(f => room.facilities.every(x => x._id.toString() != f._id.toString()));

    newlyAdded.forEach(f => {
        room.facilities.push(f);
        f.rooms.push(room);
    });

    await room.save();
    await Promise.all(toRemove.map(f => f.save()));
    await Promise.all(newlyAdded.map(f => f.save()));


}
module.exports = {
    getAllFacilities,
    createFacility,
    addFacilities
}