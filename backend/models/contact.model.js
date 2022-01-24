const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    address: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
    },
    contactId: {
        type: String,

    },
    favourite: {
        type: Boolean
    }
}, {
    timestamps: true,
})

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;