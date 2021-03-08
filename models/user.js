var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true, min: 8 },
    role: { type: 'string', default: 'user' }
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);
