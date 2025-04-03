const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('./data/database');
const port = process.env.PORT||3000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

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
      });
