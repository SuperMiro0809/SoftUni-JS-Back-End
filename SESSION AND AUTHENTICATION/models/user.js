const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017/mytestdbs', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.matchPasswords = function (providedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(providedPassword, this.password, function (err, result) {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    })
}

userSchema.pre('save', function (done) {
    const user = this;

    if (!user.isModified('password')) {
        done();
        return;
    }
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) { done(err); return; }
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) { done(err); return; }
            user.password = hash;
            done();
        });
    });
})

module.exports = new mongoose.model('user', userSchema);