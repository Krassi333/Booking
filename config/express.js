const hbs = require('express-handlebars');
const express = require('express');

module.exports = (app) => {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: false }));
    app.use('/static', express.static('static'));
}
