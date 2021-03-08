var mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: 'string', required: true, unique: true },
    slug: { type: 'string', required: true, unique: true },
    type: { type: 'string' },
    categoryImage: { type: 'string' },
    parentId: { type: 'string' },
}, {timestamps: true});

module.exports = mongoose.model('category', categorySchema);
