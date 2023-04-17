const { getAll, getById } = require('../services/acomodation');

const router = require('express').Router();

router.get('/', (req, res) => {
    const data = getAll();
    console.log(data);
    res.render('catalog', { data });
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
