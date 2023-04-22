const jwt = require('jsonwebtoken');

module.exports = (secret) => (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            const data = jwt.verify(token, secret);
            req.user = data;
        }
        catch {
            res.cookie('token', '', { maxAge: 0 });  // res.clearCookie('token');
            return res.redirect('/login');
        }

    }

    req.signJwt = (data) => jwt.sign(data, secret, { expiresIn: '4h' });

    next();
}