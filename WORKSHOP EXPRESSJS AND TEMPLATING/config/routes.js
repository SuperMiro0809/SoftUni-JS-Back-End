// TODO: Require Controllers...
const cubes = require('./database.json');
const fs = require('fs');
const path = require('path')

//c:/Visual Studio Code/JS WEB/JS BACK-END/WORKSHOP EXPRESSJS AND TEMPLATING/config


module.exports = (app) => {

    app.get('/', function (req, res) {
        res.render('index', { layout: false, cubes })
    })

    app.get('/about', function (req, res) {
        res.render('about', { layout: false })
    })

    app.get('/create', function (req, res) {
        res.render('create', { layout: false })
    })

    app.post('/create',  function (req, res) {
        const newCube = req.body;
        cubes.push(newCube);

        const data = JSON.stringify(cubes, null, 2);
        
        fs.writeFile(path.resolve('./config/database.json'), data, function (err) {
            if (err) return console.log(err);
            console.log('REplaced');
        });

        res.redirect('/');
    })

    app.post('/search', function(req, res) {
        const searchCube = req.body;

        const from = Number(searchCube.from);
        const to = Number(searchCube.to);

        let searchedCubes = [];

        cubes.forEach(cube => {
            const diffLv = Number(cube.difficultyLevel);
            if(cube.name.toLowerCase().includes(searchCube.search.toLowerCase()) && searchCube.from === '' && searchCube.to === '') {
                searchedCubes.push(cube);
            }

            if(cube.name.toLowerCase().includes(searchCube.search.toLowerCase()) && (diffLv >= from && diffLv <= to)) {
                searchedCubes.push(cube);
            }
        })

        res.render('index', { layout: false, searchedCubes, searchCube })
    })

    app.get('/details/:id', function (req, res) {
        const cube = cubes[req.params.id];
        res.render('details', { layout: false, cube })
    })

    app.get('*', function (req, res) {
       res.render('404', { layout: false });
    })
};