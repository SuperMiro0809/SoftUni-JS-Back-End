const cubeModel = require('../models/cube.js');
const accessoryModel = require('../models/accessory.js');
const accessory = require('../models/accessory.js');
const cube = require('../models/cube.js');

module.exports = {

    //cubes
    getCubes(req, res) {
        //console.log(req.query);
        const {search, from, to} = req.query;
        let query = {};

        if(search) {
            query.name = new RegExp(search, 'i');
        }
        if(from) {
            query.difficultyLevel = { $gte: +from }
        }
        if(to) {
            query.difficultyLevel = query.difficultyLevel || {};
            query.difficultyLevel.$lte = +to; 
        }

        cubeModel.find(query).lean().then((cubes) => {
            res.render('home', { cubes, search, from, to });
        });

    },
    createAndStoreCube(req, res) {
        cubeModel.create(req.body);
        res.redirect('/');
    },
    getCubeById(req, res) {
        cubeModel.findById(req.params.id).populate('accessories').lean().then((cube) => {
            //console.log(cube.accessories)
            res.render('details', { cube })
        });
    },

    //accessories
    createAndStoreAccessory(req, res) {
        accessoryModel.create(req.body);
        res.redirect('/');
    },

    getAttachAccessory(req, res) {
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
        })
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