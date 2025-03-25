const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {res.send('Hello World')});

router.use('/contacts', require('./contacts'));

router.use('/temples', require('./temples'));

router.use('/api-docs', require('./swagger'));

router.get('*', (req, res) => {
    res.send('404: oops, bad request!')
});


module.exports = router;