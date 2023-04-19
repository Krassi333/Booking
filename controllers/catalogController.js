const { getAll, getById } = require('../services/roomService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const city = req.query.city || '';
    const fromPrice = Number(req.query.fromPrice) || 1;
    const toPrice = Number(req.query.toPrice) || 1000;

    const data = await getAll(search);
    

    res.render('catalog', { data, search, city, fromPrice, toPrice });
});

router.get('/:id', async (req, res) => {
    
    const id = req.params.id;
    const data =await getById(id);
    
    if (data) {
        res.render('details', { data });
    } else {
        res.render('roomNotFound', { id })
    }

})
module.exports = router;
