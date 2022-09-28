const cubeModel = require('../models/cube.js');
const accessoryModel = require('../models/accessory.js');

module.exports = {
    getCreateAccessory(req, res) {
        res.render('createAccessory');
    },

    createAndStoreAccessory(req, res) {
        accessoryModel.create(req.body);
        res.redirect('/');
    },

    getAttachAccessory(req, res, next) {
        const cubeId = req.params.id;
        Promise.all([
            cubeModel.findById(cubeId).lean(),
            accessoryModel.find({ cubes: { $nin: cubeId } }).lean()
        ]).then(([cube, accessories]) => {
            let hasAccessories = true;
            if(accessories.length == 0) {
                hasAccessories = false;
            }
            res.render('attachAccessory', { cube, accessories, hasAccessories });
        }).catch(next)
    },

    postAttachAccessory(req, res, next) {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        Promise.all([
            cubeModel.update({ _id: cubeId }, { $push: { accessories: accessoryId } }),
            accessoryModel.update({ _id: accessoryId }, { $push: { cubes: cubeId } })
        ]).then(() => {
            res.redirect('/details/' + cubeId)
        }).catch(next)
    }
}