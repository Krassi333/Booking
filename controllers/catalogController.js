const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('catalog');
});

router.get('/:id', (req, res) => {
    res.render('details');
})
module.exports = router;
