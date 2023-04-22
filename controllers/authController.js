const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { login } = require('../services/authService');

const secret = 'gsdfghjkl';

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const result = await login(req.body.username, req.body.password);
    const token = req.signJwt(result);
    res.cookie('token', token, { maxAge: 14400000 });
    res.redirect('/')
})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const result = await login(req.body.username, req.body.password);
    const token = req.signJwt(result);
    res.cookie('token', token, { maxAge: 14400000 });
    res.redirect('/')
})


module.exports = router;