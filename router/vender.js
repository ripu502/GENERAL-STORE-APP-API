const router = require('express').Router();
const controller = require('../controller/venderController');

router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/list', verifyToken, controller.postList)

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