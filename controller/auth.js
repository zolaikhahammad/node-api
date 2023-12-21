require('dotenv').config()
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.postUserSignUp = (req, res, next) => {
    bcrypt.hash(req.body.password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            return user.save()
        })
        .then(result => {
            res.status(201).json({ message: 'User created!', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {

            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(isEqual => {
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    id: loadedUser._id.toString(),
                },
                process.env.SECRET,
                { expiresIn: '1h'}
            );
            return res.status(200).json({ token: token, userId: loadedUser._id.toString()});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}