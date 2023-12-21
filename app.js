const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const mongooseConnect = require('./database/database');
const routes = require('./routes');
const swagger = require('./middleware/swagger');
const defaultHeaders =  require('./middleware/default-headers');
const errorHandler = require('./middleware/error-handling');

const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(defaultHeaders);
app.use(swagger);
app.use('/', routes);
app.use(errorHandler);
mongooseConnect(() => {
    app.listen(3001, () => {
        console.log(`Server is running on http://localhost:${3001}`);
    });
});