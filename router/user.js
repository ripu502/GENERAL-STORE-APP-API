const router = require('express').Router();
const controller = require('../controller/userController');

router.post('/login', controller.login)


module.exports = router;