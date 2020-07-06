const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
    const { email, password } = req.body;
    let hashPassword = await bcrypt.hash(password, 12);
    const user = new User(
        {
            email,
            password: hashPassword
        })
    user.save()
        .then(result => {
            res.status(200).json(
                {
                    status: '1',
                    msg: 'User is Registered'
                }
            )
        })
        .catch(err => {
            res.status(403).json(
                {
                    status: '2',
                    msg: 'Some issue occured in registration',
                    err: err
                }
            )
        })
}

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                res.status(403).json(
                    {
                        status: '2',
                        msg: 'This user is not registered'
                    }
                )
            } else {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        res.status(403).json(
                            {
                                status: '2',
                                msg: 'Some issue occured in compare passoword',
                                err: err
                            }
                        )
                    }
                    else if (isMatch) {
                        // give token
                        jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1y' }, (err, token) => {
                            if (err) {
                                res.status(403).json(
                                    {
                                        status: '2',
                                        msg: 'Some issue occured in jwt sign',
                                        err: err
                                    }
                                )
                            } else {
                                res.status(200).json({
                                    status: '1',
                                    msg: "Right Credentials",
                                    token: token,

                                })
                            }
                        })
                    } else {
                        res.status(403).json(
                            {
                                status: '2',
                                msg: 'Wrong Password',
                            }
                        )
                    }
                });
            }
        }).catch(err => {
            res.status(403).json(
                {
                    status: '2',
                    msg: 'Some issue occured in Login',
                    err: err
                }
            )
        })
}