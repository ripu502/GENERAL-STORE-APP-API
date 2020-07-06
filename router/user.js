const router = require('express').Router();
const controller = require('../controller/userController');
const { check } = require('express-validator');
const User = require('../models/User');


router.post('/register',
    [check('email')
        .isEmail()
        .withMessage('Issue in email')
        .custom((value) => {
            return User.findOne({ email: value })
                .then(usr => {
                    if (usr)
                        return Promise.reject('User already exist : email');
                })
        })
        .normalizeEmail(),
    check('password')
        .isLength({ min: 4 })
        .withMessage('Password is empty or short')
    ],
    controller.register)

router.post('/login',
    [check('email')
        .isEmail()
        .withMessage('Issue in email')
        .normalizeEmail(),
    check('password')
        .isLength({ min: 4 })
        .withMessage('Basic Validation Failed')
    ], controller.login)

router.get('/list', verifyToken, controller.list)

module.exports = router;


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}