const Vender = require('../models/Vender');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res, next) => {
    const { mobile, password } = req.body;
    let hashPassword = await bcrypt.hash(password, 12);
    const vender = new Vender(
        {
            mobile,
            password: hashPassword
        })
    vender.save()
        .then(result => {
            res.status(200).json(
                {
                    status: '1',
                    msg: 'Vender is Registered'
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
    const { mobile, password } = req.body;
    Vender.findOne({ mobile: mobile })
        .then(vender => {
            if (!vender) {
                res.status(403).json(
                    {
                        status: '2',
                        msg: 'This vender is not registered'
                    }
                )
            } else {
                bcrypt.compare(password, vender.password, (err, isMatch) => {
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
                        jwt.sign({ id: vender._id, mobile: vender.mobile }, 'secretkey', { expiresIn: '1y' }, (err, token) => {
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


module.exports.list = (req, res, next) => {

}
