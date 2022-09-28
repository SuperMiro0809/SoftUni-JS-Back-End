// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     //userPost: [{  title: String }]
//     userPost: [{ type: mongoose.Types.ObjectId, ref: 'userPost' }]
//   });
 
//  const userPostSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     //userId: { type: mongoose.Types.ObjectId, ref: 'user'}
// });

// mongoose.connect('mongodb://localhost:27017/mytestdbs', { useUnifiedTopology: true, useNewUrlParser: true } ).then(() => {
//     console.log('Connected to db!');
      
//     const User = mongoose.model('user', userSchema);
//     const userPost = mongoose.model('userPost', userPostSchema);

//     // const newUser = new User({ name: 'Test 1', age: 20 });
//     // newUser.save();

//     //User.update({ name: "James Cameron 3" }, { $push: { userPost: { title: 'TEST 1' } }})

//     //User.create({ name: 'James Cameron 4', age: 20, userPost: [] });

//     User.updateOne({ _id: '5f80953be799455f3c13fa45' }, { $push: { userPost: '5f80895f2c86b910b48f3047' }}, function(err, result) {
//         if (err) {
//           console.error(err);
//         } else {
//           console.log(result);
//         }
//       });

//     User.findById('5f80953be799455f3c13fa45').populate('userPost').lean().then((user) => {
//         //const user1 = JSON.stringify(user, null, 2)
//         // console.log(JSON.stringify(user, null, 2));
        
//         // User.updateOne({ name: user.name }, { $push: { userPost: { title: 'TEST 3' } }}, function(err, result) {
//         //     if (err) {
//         //       console.error(err);
//         //     } else {
//         //       console.log(result);
//         //     }
//         //   });

//         console.log(user)
//     })
//     // userPost.findById('5f808ad7b8412219842ec811').then((post) => {
//     //     console.log(JSON.stringify(post, null, 2))
//     // })

//     //userPost.create({ title: 'TEST 1', content: 'This is test.', userId: '5f777fe64d22e44714e96021' }).then(() => console.log('Post added.'))

//     //db.users.update({name: "James Cameron 3"}, {$push: { userPost: { title: "TEST 1"  }}})
// });


//5f942b6145ea8a521479579b
const mongoose = require('mongoose');
//const config = require('./config/config.json');

mongoose.connect('mongodb://localhost:27017/shoeshelf', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const shoeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    creatorId: String,
    buyers: [{ type: mongoose.Types.ObjectId, ref: 'user' }]
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    offersBought: [{ type: mongoose.Types.ObjectId, ref: 'shoe' }]
});

const shoeModel = new mongoose.model('shoe', shoeSchema);
const userModel = new mongoose.model('user', userSchema);

shoeModel.find({ id: '5f942dc27017e942e4540a98'}).populate('buyers').lean().then((cube) => {
    console.log(cube)
})