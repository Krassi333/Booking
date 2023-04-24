const router = require('express').Router();
const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityService');
const { getById } = require('../services/roomService');

router.get('/create', (req, res) => {
    res.render('createFacility');
});

router.post('/create', async (req, res) => {
    try {
        console.log(req.body.label);
        await createFacility(req.body.label, req.body.iconUrl);
        res.redirect('/catalog');
    }
    catch (err) {
        res.redirect('createFacility');
    }


});

router.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    
    if (!req.user || data.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

const facilities = await getAllFacilities();

    facilities.forEach(f => {
        if ((room.facilities || []).some(id => id.toString() == f._id.toString())) {
            f.checked = true;
        }
    });

    res.render('decorate', {
        room,
        facilities
    })

});

router.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room = await getById(roomId);
    
    if (!req.user || data.owner != req.user._id) {
        return res.redirect('/auth/login');
    }
    
    await addFacilities(req.params.roomId, Object.keys(req.body));

    res.redirect('/catalog/' + req.params.roomId);
})

module.exports = router;