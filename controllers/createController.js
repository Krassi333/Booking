const router = require('express').Router();
const create = require('../services/acomodation');

router.get('/', (req, res) => {
    res.render('create');
});

router.post('/', async (req, res) => {
    const data = req.body;

    try {
        const result = await create(data);
        res.redirect('/catalog/' + result.id);
    } catch {
        res.render('/create');
    }
})
module.exports = router;