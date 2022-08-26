const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String
});

module.exports = mongoose.model('user', UserSchema);