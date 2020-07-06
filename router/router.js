const router = require('express').Router();
const userRouter = require('./user');
const venderRouter = require('./vender');

router.use('/user', userRouter);

router.use('/vender', venderRouter);

router.use('/', (req, res, next) => {
    res.status(404).json(
        {
            status: '2',
            msg: "Page not Found"
        })
})

module.exports = router;