const hbs = require('express-handlebars');
const express = require('express');
const cookieParser=require('cookie-parser');
const auth=require('../middlewares/auth');

const secret = 'gsdfghjkl';

module.exports = (app) => {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');

    app.use(express.urlencoded({ extended: false }));  //decripting the body of req
    app.use('/static', express.static('static'));  //all req to static have acsess to file static
    app.use(cookieParser());  //add middleware
    app.use(auth(secret)); //add middleware
}
