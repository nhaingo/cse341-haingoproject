const swaggerAutogen = require('swagger-autogen')();

const  doc = {
    title: 'contacts Api',
    description: 'contacts Api'
};

const outputFile = './swagger.json';
const endopointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endopointsFiles, doc);