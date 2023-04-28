const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(username, password) {
    // Check if the username is taken
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }); //options i - case insansitive

    if (existing) {
        throw new Error('Username is taken.');
    }
    //hash password
    const hashedPass = await bcrypt.hash(password, 10);
    //create and save user
    const user = await User.create({
        username,
        hashedPass
    })
    //return user data
    return {
        _id: user._id,
        username,
        roles: user.roles
    };
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }); //options i - case insansitive
    const match = await bcrypt.compare(password, user.hashedPass);

    if (!user || !match) {
        throw new Error('Incorrect username or password');
    }

    return {
        _id: user._id,
        username: user.username,
        roles: user.roles
    };
}

module.exports = { login, register }