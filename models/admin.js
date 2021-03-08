var mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true, min: 8 },
    role: { type: 'string', default: 'admin' }
}, {timestamps: true});

module.exports = mongoose.model('admin', adminSchema);
