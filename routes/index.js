/*const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});

router.use('/vehicles', require('./vehicles'));

router.use('/drivers', require('./drivers'));

//router.get('/', (req, res) => {res.send('Welcome to my personal API project')});


//router.use('/api-docs', require('./swagger'));

router.get('*', (req, res) => {
    res.send('404: oops, bad request!')
});


module.exports = router;
*/

/*const router = require('express').Router();
const passport = require('passport');

// Mount Swagger at a specific path, not root
router.use('/api-docs', require('./swagger'));

// GitHub login route (no callback needed if callback handles redirect)
router.get('/login', passport.authenticate('github'));

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Specific API routes
router.use('/vehicles', require('./vehicles'));
router.use('/drivers', require('./drivers'));

// Catch-all for all HTTP methods
router.all('*', (req, res) => {
  res.status(404).send('404: oops, bad request!');
});

module.exports = router;*/

const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.use('/drivers', require('./drivers'));
router.use('/vehicles', require('./vehicles'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if(err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;