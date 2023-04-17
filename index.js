const express = require('express');
const hbs = require('express-handlebars');
const homeController = require('./controllers/homeController');
const defaultController = require('./controllers/defaultController');
const catalogController = require('./controllers/catalogController');
const createController = require('./controllers/createController');


const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

app.use(homeController);
app.use('/catalog', catalogController);
app.use('/create', createController);

app.all('*', defaultController);

app.listen(3000, () => { console.log('Server is listening on port 3000...'); });