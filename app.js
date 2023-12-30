const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');
const routes = require('./src/routes/index');
const swagger = require('./src/middlewares/swagger');
const defaultHeaders =  require('./src/middlewares/default-headers');
const errorHandler = require('./src/middlewares/error-handling');

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(defaultHeaders);
app.use(swagger);
app.use('/', routes);
app.use(errorHandler);
app.listen(3001);
// mongooseConnect(() => {
//     app.listen(3001, () => {
//         console.log(`Server is running on http://localhost:${3001}`);
//     });
// });