const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mytestdbs', { useNewUrlParser: true, useUnifiedTopology: true });

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: String,
    accessories: [{ type: mongoose.Types.ObjectId, ref: 'accessory' }]
});

module.exports = new mongoose.model('cube', cubeSchema);