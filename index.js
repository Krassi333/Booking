const express = require('express');
const expressConfig = require('./config/express');
const routsConfig = require('./config/routes');
const databaseConfig = require('./config/database');

async function start() {
    const app = express();
    expressConfig(app);
    routsConfig(app);
    await databaseConfig(app);
    

    app.listen(3000, () => { console.log('Server is listening on port 3000...'); });
}

start();

