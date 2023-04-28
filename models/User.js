const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, require: true, minlength: 3 },
    hashedPass: { type: String, required: true },
    roles: { type: [{ type: String, enum: ['user', 'admin'] }], default: ['user'] }
});

userSchema.index({ username: 1 }, {
    unigue: true,
    collation: {
        locale: 'eu',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;