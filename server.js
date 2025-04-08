/*const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./data/database');
const port = process.env.PORT||3000;
//const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;


app.use(bodyParser.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  res.setHeader(
    'Access-control-Allow-Origin', 
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(cors({methods: ['GET', 'POST', 'DELETE', 'PUT', 'POST', 'PATCH']}))
app.use(cors({origin:'*'}));
app.use('/', require('./routes/index.js'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(_accessToken, _refreshToken, profile, done) {
  return done(null, profile);
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: 'api/docs', session: false
}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
}); 

    mongodb.initDb((error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Connected to DB`);
       
          app.listen(port, () => {
            console.log(`Database is listening and node Server running on port http://localhost:${port}`);
          });
        }
      });*/

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const GitHubStrategy = require('passport-github2').Strategy;
      
const port = process.env.PORT || 3000;
const app = express();
      
app
  .use(bodyParser.json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
      );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'POST, GET, PUT, PATCH, OPTIONS, DELETE'
      );
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes/index'));
      
passport.use(
  new GitHubStrategy(
    {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
      }
  )
);
      
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
      
app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined
    ? `Logged in as ${req.session.user.displayName}`
    : 'Logged Out'
  );
});
app.get(
  '/github/callback',
  passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);
      
//handle errors
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin: ${origin}`
    );
});
      
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on http://localhost:${port}`);
  }
});
