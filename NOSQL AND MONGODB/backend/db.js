// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/mytestdbs', { useNewUrlParser: true, useUnifiedTopology: true });
// console.log('Connected to db!');

// const cubeSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     imageUrl: String,
//     difficultyLevel: String
// });

// const Cube = mongoose.model('cube', cubeSchema);

// module.exports = function () {

//     function getCubes() {
//         let cubes = []
//         Cube.find({}).then((data) => {
//             data.forEach(cube => {
//                 let obj = {};
//                 obj.name = cube.name;
//                 obj.description = cube.description || 'TEST';
//                 obj.imageUrl = cube.imageUrl || 'https://images-na.ssl-images-amazon.com/images/I/61UFJK3IucL._AC_SX425_.jpg';
//                 obj.difficultyLevel = cube.difficultyLevel || '3';
//                 obj.id = cube.id;

//                 cubes.push(obj);
//             })
//         });

//         return cubes;
//         // return cubes;
//     }

//     function createAndStoreCube(data) {
//         // console.log(data);
//         const newCube = new Cube(data);
//         newCube.save();
//     }

//     function getCubeById(id) {
//         let cube = {};

//         Cube.findById(id).then((res) => {
//             cube.name = res.name;
//             cube.description = res.description || 'TEST';
//             cube.imageUrl = res.imageUrl || 'https://images-na.ssl-images-amazon.com/images/I/61UFJK3IucL._AC_SX425_.jpg';
//             cube.difficultyLevel = res.difficultyLevel || '3';
//             cube.id = res.id;
//         });

//         return cube;
//     }
//     //const User = mongoose.model('user', userSchema);

//     // const newUser = new User();
//     // newUser.save();


//     return {
//         getCubes,
//         createAndStoreCube,
//         getCubeById
//     }
// }