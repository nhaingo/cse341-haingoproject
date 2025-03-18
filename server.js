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
app.use('/', require('./routes'));



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
