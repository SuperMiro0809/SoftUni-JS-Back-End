const cubeModel = require('../models/cube.js');
const accessoryModel = require('../models/accessory.js');
const cube = require('../models/cube.js');

module.exports = {
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
        const { name, description, imageUrl, difficultyLevel} = req.body;
        cubeModel.create( {name, description, imageUrl, difficultyLevel, creatorId: req.user._id});
        res.redirect('/');
    },

    getCubeCreate(req, res) {
        res.render('create');
    },

    getCubeById(req, res) {
        cubeModel.findById(req.params.id).populate('accessories').lean().then((cube) => {
            let isAuthor = false;
            //console.log(cube);
            if(req.user) {
                if(cube.creatorId === req.user._id) {
                    isAuthor = true;
                }
            }    
            res.render('details', { cube, isAuthor })
        });
    },

    getEditCube(req, res) {
        const id = req.params.id;
        cubeModel.findById(id).lean().then((cube) => {
            if(cube) {
                res.render('edit', { cube });
            }
        })
    },

    postEditCube(req, res, next) {
        const { name, description, imageUrl, difficultyLevel} = req.body;

        cubeModel.update({ _id: req.params.id }, { name, description, imageUrl, difficultyLevel }, function(err, doc) {
            if(err) { next(err); return; }
            res.redirect('/details/' + req.params.id);
        });
        
    },

    getDeleteCube(req, res) {
        const id = req.params.id;

        cubeModel.findById(id).lean().then((cube) => {
            if(cube) {
                res.render('delete', { cube });
            }
        })
    },

    postDeleteCube(req, res, next) {
        const id = req.params.id;

        cubeModel.findByIdAndDelete(id, function (err) {
            if(err) { next(err); return; }
            res.redirect('/');
        })
    }

}