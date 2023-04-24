const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { login, register } = require('../services/authService');

const secret = 'gsdfghjkl';

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/')
    } catch (err) {
        console.log('post login ' + err);
        res.render('register', { error: err.message.split('/n') })
    }

})

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        if (req.body.password.trim() != req.body.repass.trim()) {
            throw new Error('Passwords don\'t match');
        }

        const result = await register(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    } catch (err) {
        console.log('post reg ' + err);

        res.render('register', { error: err.message.split('/n') })
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.redirect('/');
})

function attachToken(req, res, data) {
    const token = req.signJwt(data);
    res.cookie('token', token, { maxAge: 14400000 });
}

module.exports = router;