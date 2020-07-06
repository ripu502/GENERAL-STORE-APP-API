const router = require('express').Router();
const controller = require('../controller/venderController');

router.post('/login', controller.login)

router.get('/list', controller.list)

module.exports = router;