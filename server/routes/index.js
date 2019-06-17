const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const validateRegister = require('../validation/register.js');
const validateLogin = require('../validation/Login.js');
const jwt = require('jsonwebtoken');
const passport = require('passport');

/* fetch data from register page. */
router.post('/register', function (req, res, next) {
    const { isVal, errors } = validateRegister(req.body);
    if (!isVal) {
        return res.status(404).json(errors);
    }
    else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    errors.email = "email was used";
                    return res.status(404).json(errors);
                }
                else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password, salt, function (err, hash) {
                            const newUser = User({
                                email: req.body.email,
                                login: req.body.login,
                                password: hash
                            })
                            newUser.save()
                                .then(newUser => {
                                    res.json(newUser);
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        });
                    });
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
});

// handle login
router.post('/login', function (req, res, next) {
    const { isVal, errors } = validateLogin(req.body);
    if (!isVal) {
        return res.status(404).json(errors);
    }
    else {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password).then((match) => {
                    if (match) {
                        //first argument is id that It is encrypted to send client
                        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '1h' }, function (err, token) {
                            return res.json({
                                success: true,
                                token: token
                            })
                        });
                    }
                    else {
                        errors.password = "password is incorrect";
                        return res.status(404).json(errors);
                    }
                })
            }
            else {
                errors.email = "email does not exist";
                return res.status(404).json(errors);
            }
        })
    }
});


router.get('/', passport.authenticate('jwt', { session: false }),
    function (req, res) {
        res.json({
            _id: req.user._id,
            email: req.user.email,
            login: req.user.login,
            followers: req.user.followers,
            following: req.user.following
        })
    });

module.exports = router;
