const express = require('express');
const hbs = require('express-handlebars');
const homeController = require('./controllers/homeController');

const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

app.use(homeController);
app.listen(3000, () => { console.log('Server is listening on port 3000...'); });