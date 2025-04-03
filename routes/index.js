const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {res.send('Welcome to my personal API project')});

router.use('/vehicles', require('./vehicles'));

router.use('/drivers', require('./drivers'));

router.use('/api-docs', require('./swagger'));

router.get('*', (req, res) => {
    res.send('404: oops, bad request!')
});


module.exports = router;