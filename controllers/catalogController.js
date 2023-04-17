const { getAll, getById } = require('../services/acomodation');

const router = require('express').Router();

router.get('/', (req, res) => {
    const search = req.query.search || '';
    const city = req.query.city || '';
    const fromPrice = Number(req.query.fromPrice) || 1;
    const toPrice = Number(req.query.toPrice) || 1000;
console.log(search,city,fromPrice,toPrice);
    const data = getAll(search);
    console.log(data);

    res.render('catalog', { data, search, city, fromPrice, toPrice });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const data = getById(id);
    if (data) {
        res.render('details', { data });
    } else {
        res.render('roomNotFound', { id })
    }

})
module.exports = router;
