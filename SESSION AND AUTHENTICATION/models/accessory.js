const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mytestdbs', { useNewUrlParser: true, useUnifiedTopology: true });

const accessorySchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'cube' }]
});

module.exports = new mongoose.model('accessory', accessorySchema);