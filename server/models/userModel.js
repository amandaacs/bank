const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    role: {
        type: String,
        required:true,
        default: 'aluno',
        },
    password: {
        type: String,
        required: true, 
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    }

});

const User = mongoose.model('User', userSchema);
module.exports = User;