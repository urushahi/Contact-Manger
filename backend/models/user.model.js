const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }

}, {
    timestamps: true,
})

const User = mongoose.model('User', UserSchema);

module.exports = User;