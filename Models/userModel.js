const mongoose = require('mongoose');


// Define schema for profile
const profileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: String,
});


// Define schema for profile
const aboutSchema = new mongoose.Schema({
    pStatement: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },
    communication: {
        type: String,
        required: true,
    },
    leadership: { 
        type: String,
        required: true
    }
});

// Define schema for Messages
const messageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
        required: true,
    },
    message: { 
        type: String,
        required: true
    }
});


// Define schema for admin
const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

// Create models based on schemas
const profileModel = mongoose.model('Profile', profileSchema);
const aboutModel = mongoose.model('About', aboutSchema);
const messageModel = mongoose.model('Message', messageSchema);
const adminModel = mongoose.model('Admin', adminSchema);

module.exports = { adminModel, profileModel, aboutModel, messageModel };
