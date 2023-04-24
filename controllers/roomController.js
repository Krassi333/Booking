const { getById, update, deleteById } = require('../services/roomService');

const router = require('express').Router();

router.get('/:id/edit', async (req, res) => {
    const roomId = req.params.id;
    const data = await getById(roomId);

    if (!req.user || data.owner != req.user._id) {
       return res.redirect('/auth/login');
    }

    res.render('edit', { data });
});

router.post('/:id/edit', async (req, res) => {
    const roomId = req.params.id;
    const data = await getById(roomId);

    if (!req.user || data.owner != req.user._id) {
       return res.redirect('/auth/login');
    }

    try {
        const result = await update(roomId, req.body);
        res.redirect('/catalog/' + result._id);
    }
    catch (err) {
        console.log('post edit' + err);
        res.render('edit', { data: req.body });
    }
})

router.get('/:id/delete', async (req, res) => {
    const roomId = req.params.id;
    const data = await getById(roomId);

    if (!req.user || data.owner != req.user._id) {
       return res.redirect('/auth/login');
    }

    res.render('delete', { data });
});

router.post('/:id/delete',async (req,res)=>{
    const roomId = req.params.id;
    const data = await getById(roomId);

    if (!req.user || data.owner != req.user._id) {
       return res.redirect('/auth/login');
    }

    try {
        const result = await deleteById(roomId);
        res.redirect('/catalog');
    }
    catch (err) {
        console.log('post edit' + err);
        res.render('delete', { data });
    }
})

module.exports = router;