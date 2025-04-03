const swaggerAutogen = require('swagger-autogen')();

const  doc = {
    title: 'drivers Api',
    description: 'drivers Api'
};

const outputFile = './swagger.json';
const endopointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endopointsFiles, doc);