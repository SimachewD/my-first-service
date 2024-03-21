const mongoose = require('mongoose');


// Define schema for projects
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: String,
});


// Define schema for skills
const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    iconUrl: String,
});  

// Define schema for comments
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model
    },
});


// Define schema for likes
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User model
    },
});


// Create models based on schemas
const projectModel = mongoose.model('Project', projectSchema);
const skillModel = mongoose.model('Skill', skillSchema);
const commentModel = mongoose.model('Comment', commentSchema);
const likeModel = mongoose.model('Like', likeSchema);

module.exports = { projectModel, commentModel, likeModel, skillModel, };
