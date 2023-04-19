const mongoose = require('mongoose');

const connectStr = 'mongodb://127.0.0.1:27017';

module.exports = async (app) => {

    try {
        mongoose.connect(connectStr, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database is connected!');

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

}