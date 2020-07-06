const router = require('express').Router();
const controller = require('../controller/venderController');
const Vender = require('../models/Vender');
const { check } = require('express-validator');


router.post('/register',
    [check('mobile')
        .isLength({ min: 10, max: 10 })
        .withMessage('Issue in mobileNo')
        .custom((value) => {
            return Vender.findOne({ mobile: value })
                .then(com => {
                    if (com)
                        return Promise.reject('Vender already exist : mobileNo');
                })
        }),
    check('password')
        .isLength({ min: 4 })
        .withMessage('Password is empty or short')
    ],
    controller.register)

router.post('/login',
    [check('mobile')
        .isLength({ min: 10, max: 10 })
        .withMessage('Issue in mobileNo'),
    check('password')
        .isLength({ min: 4 })
        .withMessage('Basic Validation Failed')],
    controller.login)

router.post('/list',
    [check('title')
        .isLength({ min: 5 })
        .withMessage('Title is too short'),
    check('description')
        .isLength({ min: 8 })
        .withMessage('Description is too short'),
    check('price').isNumeric().withMessage('Issue in the price')
    ], verifyToken, controller.postList)

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